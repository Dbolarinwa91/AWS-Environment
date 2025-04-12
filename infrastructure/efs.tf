# efs.tf - Contains EFS resources for SonarQube persistent storage

# Security Group for EFS
resource "aws_security_group" "efs_sg" {
  name        = "efs-sg-sonarqube"
  description = "Allow NFS traffic from ECS tasks to EFS"
  vpc_id      = aws_vpc.main.id

  ingress {
    description     = "NFS from ECS tasks"
    from_port       = 2049
    to_port         = 2049
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
    Name = "efs-sg-sonarqube-project"
  }
}

# EFS File System
resource "aws_efs_file_system" "sonarqube_data" {
  creation_token = "sonarqube-data"
  
  performance_mode                = var.efs_performance_mode
  throughput_mode                 = var.efs_throughput_mode
  encrypted                       = var.efs_encrypted

  lifecycle_policy {
    transition_to_ia = var.efs_transition_to_ia
  }

  tags = {
    Name = "sonarqube-efs-data"
  }
}

# EFS Mount Targets - one per subnet to ensure high availability
resource "aws_efs_mount_target" "sonarqube_mount_target_1" {
  file_system_id  = aws_efs_file_system.sonarqube_data.id
  subnet_id       = aws_subnet.subnet_1.id
  security_groups = [aws_security_group.efs_sg.id]
}

resource "aws_efs_mount_target" "sonarqube_mount_target_2" {
  file_system_id  = aws_efs_file_system.sonarqube_data.id
  subnet_id       = aws_subnet.subnet_2.id
  security_groups = [aws_security_group.efs_sg.id]
}

resource "aws_efs_mount_target" "sonarqube_mount_target_3" {
  file_system_id  = aws_efs_file_system.sonarqube_data.id
  subnet_id       = aws_subnet.subnet_3.id
  security_groups = [aws_security_group.efs_sg.id]
}

# EFS Access Point for SonarQube data directory
resource "aws_efs_access_point" "sonarqube_data_ap" {
  file_system_id = aws_efs_file_system.sonarqube_data.id
  
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
    Name = "sonarqube-data-access-point"
  }
}