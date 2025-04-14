# ECS Task Definition
resource "aws_ecs_task_definition" "grafana" {
  family                   = "grafana-task"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "512"
  memory                   = "1024"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn            = aws_iam_role.ecs_task_role.arn
  
  # EFS volume configuration
  volume {
    name = "grafana_data"
    efs_volume_configuration {
      file_system_id     = aws_efs_file_system.sonarqube.id
      transit_encryption = "ENABLED"
      authorization_config {
        access_point_id = aws_efs_access_point.grafana_data.id
        iam             = "ENABLED"
      }
    }
  }
  
  # Container definition with environment variables, secrets, mounts, etc.
  container_definitions = jsonencode([{
    name      = "grafana-container"
    image     = "grafana/grafana:latest"
    essential = true
    
    portMappings = [{
      containerPort = 3000
      hostPort      = 3000
      protocol      = "tcp"
    }]
    
    environment = [
      {
        name  = "GF_INSTALL_PLUGINS"
        value = "grafana-clock-panel,grafana-simple-json-datasource"
      },
      {
        name  = "GF_SECURITY_ADMIN_USER"
        value = "admin"
      },
      {
        name  = "GF_SERVER_ROOT_URL"
        value = "http://david-app-lb-928717528.us-east-1.elb.amazonaws.com:9000/grafana"
      },
      {
        name  = "GF_PATHS_DATA"
        value = "/var/lib/grafana"
      },
      {
        name  = "GF_PATHS_LOGS"
        value = "/var/log/grafana"
      }
    ],
    
    secrets = [
      {
        name      = "GF_SECURITY_ADMIN_PASSWORD"
        valueFrom = aws_ssm_parameter.grafana_admin_password.arn
      }
    ],
    
    mountPoints = [
      {
        sourceVolume  = "grafana_data"
        containerPath = "/var/lib/grafana"
        readOnly      = false
      }
    ],
    
    logConfiguration = {
      logDriver = "awslogs"
      options = {
        "awslogs-group"         = aws_cloudwatch_log_group.grafana_logs.name
        "awslogs-region"        = var.aws_region
        "awslogs-stream-prefix" = "ecs"
      }
    },
    
    healthCheck = {
      command     = ["CMD-SHELL", "wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1"]
      interval    = 30
      timeout     = 5
      retries     = 3
      startPeriod = 60
    }
  }])
  
  tags = {
    Name = "grafana-task-def-devops-David-site-project"
  }
  
  depends_on = [
    aws_iam_role.ecs_task_execution_role,
    aws_iam_role.ecs_task_role,
    aws_cloudwatch_log_group.grafana_logs
  ]
}

# ECS Service
resource "aws_ecs_service" "grafana" {
  name            = "grafana-service"
  cluster         = aws_ecs_cluster.main.id  # Reusing existing cluster
  task_definition = aws_ecs_task_definition.grafana.arn
  desired_count   = 1  # Set to higher value for HA
  launch_type     = "FARGATE"
  
  platform_version = "1.4.0"
  
  health_check_grace_period_seconds = 60
  
  deployment_controller {
    type = "ECS"
  }
  
  deployment_maximum_percent         = 200
  deployment_minimum_healthy_percent = 100
  
  network_configuration {
    security_groups  = [aws_security_group.grafana_tasks.id]
    subnets          = [
      aws_subnet.subnet_1.id, 
      aws_subnet.subnet_2.id, 
      aws_subnet.subnet_3.id
    ]
    assign_public_ip = true
  }
  
  load_balancer {
    target_group_arn = aws_lb_target_group.grafana_tg.arn
    container_name   = "grafana-container"
    container_port   = 3000
  }
  
  deployment_circuit_breaker {
    enable   = true
    rollback = true
  }
  
  depends_on = [
    aws_lb_listener.grafana,
    aws_ecs_cluster.main,
    aws_ecs_task_definition.grafana,
    aws_security_group.grafana_tasks,
    aws_lb_target_group.grafana_tg
  ]
  
  tags = {
    Name = "grafana-service-devops-David-site-project"
  }
}