# ----------------------------------------
# database.tf - RDS PostgreSQL database for SonarQube
# ----------------------------------------

# Security group for RDS
resource "aws_security_group" "rds_sg" {
  name        = "rds-sg-sonarqube"
  description = "Allow PostgreSQL traffic from ECS tasks"
  vpc_id      = aws_vpc.main.id

  ingress {
    description     = "PostgreSQL from ECS tasks"
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.sonarqube_tasks.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "rds-sg-sonarqube-project"
  }
}

# DB subnet group
resource "aws_db_subnet_group" "sonarqube" {
  name       = "sonarqube-db-subnet-group"
  subnet_ids = [aws_subnet.subnet_1.id, aws_subnet.subnet_2.id, aws_subnet.subnet_3.id]

  tags = {
    Name = "sonarqube-db-subnet-group"
  }
}

# KMS key for database encryption
resource "aws_kms_key" "rds_encryption_key" {
  description             = "KMS key for RDS encryption"
  deletion_window_in_days = 10
  enable_key_rotation     = true

  tags = {
    Name = "sonarqube-rds-encryption-key"
  }
}

# RDS PostgreSQL instance
resource "aws_db_instance" "sonarqube" {
  identifier             = "sonarqube-db"
  engine                 = "postgres"
  engine_version         = "13.4"
  instance_class         = var.db_instance_class
  allocated_storage      = var.db_allocated_storage
  max_allocated_storage  = 100  # Allow storage autoscaling up to 100GB
  storage_type           = "gp2"
  storage_encrypted      = true
  kms_key_id             = aws_kms_key.rds_encryption_key.arn
  db_name                = var.db_name
  username               = var.db_username
  password               = var.db_password
  multi_az               = true  # Multi-AZ for high availability
  db_subnet_group_name   = aws_db_subnet_group.sonarqube.name
  vpc_security_group_ids = [aws_security_group.rds_sg.id]
  publicly_accessible    = false
  skip_final_snapshot    = false
  final_snapshot_identifier = "sonarqube-final-snapshot"
  deletion_protection    = true  # Protect from accidental deletion
  backup_retention_period = 7  # Keep backups for 7 days
  backup_window          = "03:00-04:00"  # UTC
  maintenance_window     = "Mon:04:30-Mon:05:30"

  # Enable automated backups
  copy_tags_to_snapshot  = true
  
  # Enable enhanced monitoring
  monitoring_interval    = 60
  monitoring_role_arn    = aws_iam_role.rds_monitoring_role.arn

  # Performance Insights
  performance_insights_enabled = true
  performance_insights_retention_period = 7  # Days

  tags = {
    Name = "sonarqube-postgres-db"
  }

  depends_on = [
    aws_iam_role.rds_monitoring_role
  ]
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

# SSM Parameter to store RDS endpoint (for reference)
resource "aws_ssm_parameter" "db_endpoint" {
  name        = "/sonarqube/db/endpoint"
  description = "SonarQube database endpoint"
  type        = "String"
  value       = aws_db_instance.sonarqube.endpoint
}

# SSM Parameter to store RDS credentials (more secure than hardcoding in container definitions)
resource "aws_ssm_parameter" "db_username" {
  name        = "/sonarqube/db/username"
  description = "SonarQube database username"
  type        = "String"
  value       = var.db_username
}

resource "aws_ssm_parameter" "db_password" {
  name        = "/sonarqube/db/password"
  description = "SonarQube database password"
  type        = "SecureString"
  value       = var.db_password
  key_id      = aws_kms_key.rds_encryption_key.key_id
}