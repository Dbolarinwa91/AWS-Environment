# cloudwatch.tf - Contains CloudWatch log group configuration

# CloudWatch Log Group for ECS
resource "aws_cloudwatch_log_group" "ecs_logs" {
  name              = "/ecs/david-app-container"
  retention_in_days = 30
  
  tags = {
    Name = "ecs-logs-devops-David-site-project"
  }
}