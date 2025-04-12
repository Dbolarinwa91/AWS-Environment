# ----------------------------------------
# outputs.tf - Output values
# ----------------------------------------

output "vpc_id" {
  description = "The ID of the VPC"
  value       = aws_vpc.main.id
}

output "subnet_ids" {
  description = "The IDs of the subnets"
  value       = [aws_subnet.subnet_1.id, aws_subnet.subnet_2.id, aws_subnet.subnet_3.id]
}

output "alb_dns_name" {
  description = "The DNS name of the load balancer"
  value       = aws_lb.app_lb.dns_name
}

output "ecs_cluster_name" {
  description = "The name of the ECS cluster"
  value       = aws_ecs_cluster.main.name
}

output "security_group_lb" {
  description = "The ID of the security group for the load balancer"
  value       = aws_security_group.lb_sg.id
}

output "security_group_ecs" {
  description = "The ID of the security group for the ECS tasks"
  value       = aws_security_group.sonarqube_tasks.id
}

# SonarQube specific outputs
output "sonarqube_url" {
  description = "The URL to access SonarQube"
  value       = "${aws_lb.app_lb.dns_name}:9000"
}

output "sonarqube_service_name" {
  description = "The name of the SonarQube ECS service"
  value       = aws_ecs_service.sonarqube.name
}

output "sonarqube_task_definition_arn" {
  description = "The ARN of the SonarQube task definition"
  value       = aws_ecs_task_definition.sonarqube.arn
}

output "sonarqube_security_group" {
  description = "The ID of the security group for the SonarQube tasks"
  value       = aws_security_group.sonarqube_tasks.id
}


# Database outputs
output "db_endpoint" {
  description = "The endpoint of the database"
  value       = aws_db_instance.sonarqube.endpoint
}

output "db_instance_id" {
  description = "The ID of the RDS instance"
  value       = aws_db_instance.sonarqube.id
}