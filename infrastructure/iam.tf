# ----------------------------------------
# iam.tf - IAM roles and policies
# ----------------------------------------

# ECS Task Execution Role - Used by ECS to pull images, publish logs, etc.
# Get current AWS account ID
data "aws_caller_identity" "current" {}

resource "aws_iam_role" "ecs_task_execution_role" {
  name = "ecs-task-execution-role-david"
  
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })
  
  tags = {
    Name = "ecs-task-execution-role-devops-David-site-project"
  }
}

# Attach the ECS Task Execution Policy to the role
resource "aws_iam_role_policy_attachment" "ecs_task_execution_role_policy" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
  depends_on = [aws_iam_role.ecs_task_execution_role]
}

# ECS Task Role - Used by the container instances to access AWS services
resource "aws_iam_role" "ecs_task_role" {
  name = "ecs-task-role-sonarqube"
  
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })
  
  tags = {
    Name = "ecs-task-role-sonarqube-project"
  }
}

# Policy for EFS access and SSM Parameter access
resource "aws_iam_policy" "ecs_task_efs_ssm_access" {
  name        = "ecs-task-efs-ssm-access-policy"
  description = "Allow ECS tasks to access EFS file systems and SSM parameters"
  
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
      },
      {
        Effect = "Allow"
        Action = [
          "ssm:GetParameters",
          "ssm:GetParameter"
        ]
        Resource = [
          "arn:aws:ssm:*:*:parameter/sonarqube/*"
        ]
      },
      {
        Effect = "Allow"
        Action = [
          "kms:Decrypt"
        ]
        Resource = [
          aws_kms_key.rds_encryption_key.arn
        ]
      }
    ]
  })
}

# Attach EFS and SSM access policy to task role
resource "aws_iam_role_policy_attachment" "ecs_task_role_efs_ssm_policy" {
  role       = aws_iam_role.ecs_task_role.name
  policy_arn = aws_iam_policy.ecs_task_efs_ssm_access.arn
  depends_on = [aws_iam_role.ecs_task_role, aws_iam_policy.ecs_task_efs_ssm_access]
}

# IAM role for RDS enhanced monitoring

resource "aws_iam_role" "rds_monitoring_role" {
  name = "rds-monitoring-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "monitoring.rds.amazonaws.com"
        }
      }
    ]
  })

  tags = {
    Name = "rds-monitoring-role-sonarqube"
  }
}

# Attach the RDS monitoring policy to the role
resource "aws_iam_role_policy_attachment" "rds_monitoring_role_policy" {
  role       = aws_iam_role.rds_monitoring_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonRDSEnhancedMonitoringRole"
}
# Create a policy for SSM Parameter access for the execution role
resource "aws_iam_policy" "ecs_execution_ssm_access" {
  name        = "ecs-execution-ssm-access-policy"
  description = "Allow ECS task execution role to access SSM parameters"
  
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
          "arn:aws:ssm:*:*:parameter/sonarqube/*",
            "arn:aws:ssm:*:*:parameter/sonarqube/db/*"

        ]
      },
      {
        Effect = "Allow"
        Action = [
          "kms:Decrypt"
        ]
        Resource = [
          aws_kms_key.rds_encryption_key.arn
        ]
      }
    ]
  })
}

# Attach the SSM access policy to the task execution role
resource "aws_iam_role_policy_attachment" "ecs_task_execution_ssm_policy" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = aws_iam_policy.ecs_execution_ssm_access.arn
}
