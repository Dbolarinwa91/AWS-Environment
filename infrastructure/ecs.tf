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

# Task Definition template (will be referenced by the ECS service)
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

# ECS Service to deploy tasks across the subnets in different AZs
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