# ecs.tf - Contains ECS Cluster, Task Definition, and Service

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

# Task Definition template for main app
resource "aws_ecs_task_definition" "app" {
  family                   = "david-app-task"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  
  container_definitions = jsonencode([{
    name      = "david-app-container"
    image     = "nginx:latest"  # This will be overridden by your YAML deployment file
    essential = true
    
    portMappings = [{
      containerPort = 80
      hostPort      = 80
      protocol      = "tcp"
    }]
    
    logConfiguration = {
      logDriver = "awslogs"
      options = {
        "awslogs-group"         = aws_cloudwatch_log_group.ecs_logs.name
        "awslogs-region"        = "us-east-1"
        "awslogs-stream-prefix" = "ecs"
      }
    }
  }])
  
  tags = {
    Name = "ecs-task-def-devops-David-site-project"
  }
  
  depends_on = [
    aws_iam_role.ecs_task_execution_role,
    aws_cloudwatch_log_group.ecs_logs
  ]
}

# Task Definition for SonarQube
resource "aws_ecs_task_definition" "sonarqube" {
  family                   = "sonarqube-task"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "1024"
  memory                   = "2048"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  
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
      }
    ],
    
    logConfiguration = {
      logDriver = "awslogs"
      options = {
        "awslogs-group"         = aws_cloudwatch_log_group.sonarqube_logs.name
        "awslogs-region"        = "us-east-1"
        "awslogs-stream-prefix" = "ecs"
      }
    },
    
    ulimits = [{
      name      = "nofile"
      softLimit = 65536
      hardLimit = 65536
    }]
  }])
  
  tags = {
    Name = "sonarqube-task-def-devops-David-site-project"
  }
  
  depends_on = [
    aws_iam_role.ecs_task_execution_role,
    aws_cloudwatch_log_group.sonarqube_logs
  ]
}

# ECS Service for main app
resource "aws_ecs_service" "app" {
  name            = "david-app-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.app.arn
  desired_count   = 3  # One per subnet/AZ
  launch_type     = "FARGATE"
  
  network_configuration {
    security_groups  = [aws_security_group.ecs_tasks.id]
    subnets          = [
      aws_subnet.subnet_1.id, 
      aws_subnet.subnet_2.id, 
      aws_subnet.subnet_3.id
    ]
    assign_public_ip = true  # Since you're using public subnets
  }
  
  load_balancer {
    target_group_arn = aws_lb_target_group.app_tg.arn
    container_name   = "david-app-container"
    container_port   = 80
  }
  
  # Ignore changes to desired count because we'll be using auto scaling
  lifecycle {
    ignore_changes = [desired_count]
    create_before_destroy = true
  }
  
  depends_on = [
    aws_lb_listener.front_end,
    aws_ecs_cluster.main,
    aws_ecs_task_definition.app,
    aws_security_group.ecs_tasks,
    aws_subnet.subnet_1,
    aws_subnet.subnet_2,
    aws_subnet.subnet_3,
    aws_lb_target_group.app_tg
  ]
  
  tags = {
    Name = "ecs-service-devops-David-site-project"
  }
}

# ECS Service for SonarQube
resource "aws_ecs_service" "sonarqube" {
  name            = "sonarqube-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.sonarqube.arn
  desired_count   = 1  # SonarQube usually runs as a single instance
  launch_type     = "FARGATE"
  
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
  
  depends_on = [
    aws_lb_listener.sonarqube,
    aws_ecs_cluster.main,
    aws_ecs_task_definition.sonarqube,
    aws_security_group.sonarqube_tasks,
    aws_subnet.subnet_1,
    aws_subnet.subnet_2,
    aws_subnet.subnet_3,
    aws_lb_target_group.sonarqube_tg
  ]
  
  tags = {
    Name = "sonarqube-service-devops-David-site-project"
  }
}