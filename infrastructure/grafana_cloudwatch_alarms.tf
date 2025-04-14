# CloudWatch Log Group
resource "aws_cloudwatch_log_group" "grafana_logs" {
  name              = "/ecs/grafana"
  retention_in_days = 30
  
  tags = {
    Name = "grafana-logs-devops-David-site-project"
  }
}