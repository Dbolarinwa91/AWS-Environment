# outputs.tf

# VPC
output "vpc_id" {
  description = "ID of the created VPC"
  value       = aws_vpc.main.id
}

output "vpc_cidr" {
  description = "CIDR block of the created VPC"
  value       = aws_vpc.main.cidr_block
}

# Subnets
output "subnet_1_id" {
  description = "ID of subnet 1"
  value       = aws_subnet.subnet_1.id
}

output "subnet_2_id" {
  description = "ID of subnet 2"
  value       = aws_subnet.subnet_2.id
}

output "subnet_3_id" {
  description = "ID of subnet 3"
  value       = aws_subnet.subnet_3.id
}

output "subnet_1_cidr" {
  description = "CIDR block of subnet 1"
  value       = aws_subnet.subnet_1.cidr_block
}

output "subnet_2_cidr" {
  description = "CIDR block of subnet 2"
  value       = aws_subnet.subnet_2.cidr_block
}

output "subnet_3_cidr" {
  description = "CIDR block of subnet 3"
  value       = aws_subnet.subnet_3.cidr_block
}

# Internet Gateway
output "internet_gateway_id" {
  description = "ID of the created Internet Gateway"
  value       = aws_internet_gateway.internet_gw.id
}

# Route Table
output "route_table_id" {
  description = "ID of the created Route Table"
  value       = aws_route_table.route_table.id
}

#----->
# outputs.tf

output "cluster_id" {
  description = "The ID of the ECS cluster"
  value       = aws_ecs_cluster.main.id
}

output "cluster_name" {
  description = "The name of the ECS cluster"
  value       = aws_ecs_cluster.main.name
}

output "task_execution_role_arn" {
  description = "ARN of the ECS task execution role"
  value       = aws_iam_role.ecs_task_execution_role.arn
}

output "task_definition_arn" {
  description = "ARN of the task definition"
  value       = aws_ecs_task_definition.app.arn
}

output "load_balancer_dns" {
  description = "DNS name of the load balancer"
  value       = aws_lb.app_lb.dns_name
}

output "load_balancer_arn" {
  description = "ARN of the load balancer"
  value       = aws_lb.app_lb.arn
}

output "target_group_arn" {
  description = "ARN of the target group"
  value       = aws_lb_target_group.app_tg.arn
}

output "service_name" {
  description = "Name of the ECS service"
  value       = aws_ecs_service.app.name
}

output "service_url" {
  description = "URL of the application"
  value       = "http://${aws_lb.app_lb.dns_name}"
}

output "cloudwatch_log_group_name" {
  description = "Name of the CloudWatch log group"
  value       = aws_cloudwatch_log_group.ecs_logs.name
}

output "security_groups" {
  description = "Security groups for ECS tasks and load balancer"
  value = {
    ecs_tasks = aws_security_group.ecs_tasks.id
    load_balancer = aws_security_group.lb_sg.id
  }
}

output "autoscaling_target" {
  description = "Auto Scaling target resource ID"
  value       = aws_appautoscaling_target.ecs_target.resource_id
}