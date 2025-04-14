# SSM Parameter
resource "aws_ssm_parameter" "grafana_admin_password" {
  name        = "/grafana/admin-password"
  description = "Grafana admin password"
  type        = "SecureString"
  value       = var.grafana_admin_password  # Define this variable
  
  tags = {
    Name = "grafana-admin-password-devops-David-site-project"
  }
}
# Add SSM Parameter access to the ECS Task Execution Role
resource "aws_iam_role_policy" "ecs_task_execution_ssm" {
  name   = "ecs-task-execution-ssm-policy"
  role   = aws_iam_role.ecs_task_execution_role.id
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action = [
          "ssm:GetParameters",
          "ssm:GetParameter"
        ],
        Resource = [
          "arn:aws:ssm:us-east-1:061652678349:parameter/grafana/admin-password"
        ]
      }
    ]
  })
}