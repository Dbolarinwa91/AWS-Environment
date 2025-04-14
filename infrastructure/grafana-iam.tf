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
# Create a policy for Grafana SSM Parameter access
resource "aws_iam_policy" "ecs_grafana_ssm_access" {
  name        = "ecs-grafana-ssm-access-policy"
  description = "Allow ECS task execution role to access Grafana SSM parameters"
  
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "ssm:GetParameters",
          "ssm:GetParameter"
        ]
        Resource = [
          "arn:aws:ssm:*:*:parameter/grafana/*"
        ]
      }
    ]
  })
}

# Attach the Grafana SSM access policy to the task execution role
resource "aws_iam_role_policy_attachment" "ecs_task_execution_grafana_ssm_policy" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = aws_iam_policy.ecs_grafana_ssm_access.arn
}