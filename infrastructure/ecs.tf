# ----------------------------------------
# ecs.tf - ECS resources configuration
# ----------------------------------------

#============================================
# ECS Cluster
resource "aws_ecs_cluster" "main" {
  name = "devops-david-cluster"
  
  setting {
    name  = "containerInsights"
    value = "enabled"
  }
  
  tags = {
    Name = "ecs-cluster-devops-David-site-project"
  }
}

# Unused task definition removed

# Main app service has been removed

# Task Definition for SonarQube with EFS volume
resource "aws_ecs_task_definition" "sonarqube" {
  family                   = "sonarqube-task"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "1024"
  memory                   = "2048"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn            = aws_iam_role.ecs_task_role.arn

  # Remove the EFS volume configuration since we're using RDS now
  
  container_definitions = jsonencode([{
    name      = "sonarqube-container"
    image     = "sonarqube:latest"
    essential = true
    
    portMappings = [{
      containerPort = 9000
      hostPort      = 9000
      protocol      = "tcp"
    }]
    
    environment = [
      {
        name  = "SONAR_SEARCH_JAVAADDITIONALOPTS"
        value = "-Dnode.store.allow_mmap=false -Ddiscovery.type=single-node"
      },
      {
        name  = "SONAR_ES_BOOTSTRAP_CHECKS_DISABLE"
        value = "true"
      },
      {
        name  = "SONAR_JDBC_USERNAME"
        value = "${var.db_username}"
      },
      {
        name  = "SONAR_JDBC_URL"
        value = "jdbc:postgresql://${aws_db_instance.sonarqube.endpoint}/${var.db_name}?sslmode=require"
      },
      # Add recommended PostgreSQL parameters
      {
        name  = "SONAR_JDBC_MAXACTIVE"
        value = "60"
      },
      {
        name  = "SONAR_JDBC_MINIDLE"
        value = "10"
      },
      {
        name  = "SONAR_JDBC_MAXIDLE"
        value = "20"
      }
    ],
    
    secrets = [
      {
        name      = "SONAR_JDBC_PASSWORD"
        valueFrom = aws_ssm_parameter.db_password.arn
      }
    ],
    
    # Remove mount points since we're not using EFS anymore
    
    logConfiguration = {
      logDriver = "awslogs"
      options = {
        "awslogs-group"         = aws_cloudwatch_log_group.sonarqube_logs.name
        "awslogs-region"        = var.aws_region
        "awslogs-stream-prefix" = "ecs"
      }
    },
    
    ulimits = [
      {
        name      = "nofile"
        softLimit = 65536
        hardLimit = 65536
      },
      # Add recommended SonarQube ulimits for production
      {
        name      = "nproc"
        softLimit = 8192
        hardLimit = 8192
      }
    ],
    
    # Add healthcheck for container
    healthCheck = {
      command     = ["CMD-SHELL", "curl -f http://localhost:9000/api/system/status || exit 1"]
      interval    = 30
      timeout     = 5
      retries     = 3
      startPeriod = 120  # SonarQube can take time to start, especially first time
    }
  }])
  
  tags = {
    Name = "sonarqube-task-def-devops-David-site-project"
  }
  
  depends_on = [
    aws_iam_role.ecs_task_execution_role,
    aws_iam_role.ecs_task_role,
    aws_cloudwatch_log_group.sonarqube_logs,
    aws_db_instance.sonarqube
  ]
}

# ECS Service for SonarQube with high availability
resource "aws_ecs_service" "sonarqube" {
  name            = "sonarqube-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.sonarqube.arn
  desired_count   = var.sonarqube_instance_count
  launch_type     = "FARGATE"
  
  # We can still use 1.4.0 for consistency, but EFS requirement is no longer needed
  platform_version = "1.4.0"
  
  # Important for handling health checks properly
  health_check_grace_period_seconds = var.sonarqube_health_check_grace_period
  
  # Deployment configuration for minimum healthy percent
  deployment_controller {
    type = "ECS"
  }
  
  deployment_maximum_percent         = 200
  deployment_minimum_healthy_percent = 100
  
  network_configuration {
    security_groups  = [aws_security_group.sonarqube_tasks.id]
    subnets          = [
      aws_subnet.subnet_1.id, 
      aws_subnet.subnet_2.id, 
      aws_subnet.subnet_3.id
    ]
    assign_public_ip = true
  }
  
  load_balancer {
    target_group_arn = aws_lb_target_group.sonarqube_tg.arn
    container_name   = "sonarqube-container"
    container_port   = 9000
  }
  
  # Circuit breaker to detect failures faster
  deployment_circuit_breaker {
    enable   = true
    rollback = true
  }
  
  # For HA, we need to ensure instances are properly spread
  ordered_placement_strategy {
    type  = "spread"
    field = "attribute:ecs.availability-zone"
  }
  
  # We don't use lifecycle ignore_changes for desired_count here as we want to enforce
  # the specified instance count for HA, letting autoscaling handle additional capacity needs
  
  depends_on = [
    aws_lb_listener.sonarqube,
    aws_ecs_cluster.main,
    aws_ecs_task_definition.sonarqube,
    aws_security_group.sonarqube_tasks,
    aws_subnet.subnet_1,
    aws_subnet.subnet_2,
    aws_subnet.subnet_3,
    aws_lb_target_group.sonarqube_tg,
    aws_db_instance.sonarqube
    # Removed EFS mount target dependencies since we're using RDS now
  ]
  
  tags = {
    Name = "sonarqube-service-devops-David-site-project"
  }
}