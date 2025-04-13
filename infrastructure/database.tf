# ----------------------------------------
# database.tf - RDS PostgreSQL database for SonarQube
# ----------------------------------------

# Security group for RDS - without cyclic references
resource "aws_security_group" "rds_sg" {
  name        = "rds-sg-sonarqube"
  description = "Allow PostgreSQL traffic from ECS tasks"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.sonarqube_tasks.id]  # Correct attribute
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
  deletion_window_in_days = 7
  enable_key_rotation     = true

  tags = {
    Name = "sonarqube-rds-encryption-key"
  }
}

# RDS PostgreSQL instance
resource "aws_db_instance" "sonarqube" {
  identifier             = "sonarqube-db"
  engine                 = "postgres"
  engine_version         = "17.4"
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
  deletion_protection    = false  # Protect from accidental deletion
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


# SSM Parameter to store RDS endpoint (for reference)
resource "aws_ssm_parameter" "db_endpoint" {
  name        = "/sonarqube/db/endpoint"
  description = "SonarQube database endpoint"
  type        = "String"
  value       = aws_db_instance.sonarqube.endpoint
    tags        = {
        Name = "aws_ssm_parameter_sonarqube-db-endpoint"
    }
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

# EFS File System for SonarQube persistent storage
resource "aws_efs_file_system" "sonarqube" {
  creation_token = "sonarqube-efs"
  encrypted      = true
  kms_key_id     = aws_kms_key.rds_encryption_key.arn
  
  performance_mode = "generalPurpose"
  throughput_mode  = "bursting"
  
  lifecycle_policy {
    transition_to_ia = "AFTER_30_DAYS"
  }
  
  tags = {
    Name = "sonarqube-efs-devops-David-site-project"
  }
}
# EFS Mount Targets in each subnet/AZ
resource "aws_efs_mount_target" "sonarqube_az1" {
  file_system_id  = aws_efs_file_system.sonarqube.id
  subnet_id       = aws_subnet.subnet_1.id
  security_groups = [aws_security_group.efs_sg.id]
}

resource "aws_efs_mount_target" "sonarqube_az2" {
  file_system_id  = aws_efs_file_system.sonarqube.id
  subnet_id       = aws_subnet.subnet_2.id
  security_groups = [aws_security_group.efs_sg.id]
}

resource "aws_efs_mount_target" "sonarqube_az3" {
  file_system_id  = aws_efs_file_system.sonarqube.id
  subnet_id       = aws_subnet.subnet_3.id
  security_groups = [aws_security_group.efs_sg.id]
}

# EFS Access Points for different SonarQube directory purposes
resource "aws_efs_access_point" "sonarqube_data" {
  file_system_id = aws_efs_file_system.sonarqube.id
  
  posix_user {
    gid = 1000
    uid = 1000
  }
  
  root_directory {
    path = "/sonarqube-data"
    creation_info {
      owner_gid   = 1000
      owner_uid   = 1000
      permissions = "755"
    }
  }
  
  tags = {
    Name = "sonarqube-data-ap-devops-David-site-project"
  }
}

resource "aws_efs_access_point" "sonarqube_logs" {
  file_system_id = aws_efs_file_system.sonarqube.id
  
  posix_user {
    gid = 1000
    uid = 1000
  }
  
  root_directory {
    path = "/sonarqube-logs"
    creation_info {
      owner_gid   = 1000
      owner_uid   = 1000
      permissions = "755"
    }
  }
  
  tags = {
    Name = "sonarqube-logs-ap-devops-David-site-project"
  }
}

resource "aws_efs_access_point" "sonarqube_extensions" {
  file_system_id = aws_efs_file_system.sonarqube.id
  
  posix_user {
    gid = 1000
    uid = 1000
  }
  
  root_directory {
    path = "/sonarqube-extensions"
    creation_info {
      owner_gid   = 1000
      owner_uid   = 1000
      permissions = "755"
    }
  }
  
  tags = {
    Name = "sonarqube-extensions-ap-devops-David-site-project"
  }
}