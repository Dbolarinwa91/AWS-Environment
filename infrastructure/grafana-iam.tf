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
# Update policy for EFS access to include the specific access point
resource "aws_iam_policy" "grafana_efs_access" {
  name        = "grafana-efs-access-policy"
  description = "Allow Grafana tasks to access specific EFS access point"
  
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "elasticfilesystem:ClientMount",
          "elasticfilesystem:ClientWrite",
          "elasticfilesystem:ClientRootAccess",
          "elasticfilesystem:DescribeMountTargets"
        ]
        Resource = "*"
        Condition = {
          StringEquals = {
            "elasticfilesystem:AccessPointArn": "arn:aws:elasticfilesystem:${var.aws_region}:${data.aws_caller_identity.current.account_id}:access-point/fsap-0cb8a17063986825a"
          }
        }
      }
    ]
  })
}

# Attach the Grafana EFS access policy to the task role
resource "aws_iam_role_policy_attachment" "grafana_efs_access_attachment" {
  role       = aws_iam_role.ecs_task_role.name
  policy_arn = aws_iam_policy.grafana_efs_access.arn
}