# ----------------------------------------
# security.tf - Security Groups
# ----------------------------------------

# Security Group for ECS Tasks
resource "aws_security_group" "ecs_tasks" {
  name        = "ecs-tasks-sg-david"
  description = "Allow inbound traffic to ECS tasks"
  vpc_id      = aws_vpc.main.id

  ingress {
    protocol        = "tcp"
    from_port       = 80
    to_port         = 80
    cidr_blocks     = ["0.0.0.0/0"]
  }

  # Allow outbound traffic to RDS
  egress {
    protocol        = "tcp"
    from_port       = 5432
    to_port         = 5432
    security_groups = [aws_security_group.rds_sg.id]
  }

  # Allow outbound traffic to EFS
  egress {
    protocol        = "tcp"
    from_port       = 2049
    to_port         = 2049
    security_groups = [aws_security_group.efs_sg.id]
  }

  # Allow all other outbound traffic
  egress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  tags = {
    Name = "ecs-sg-devops-David-site-project"
  }
  
  depends_on = [aws_vpc.main]
}

# Security Group for SonarQube Tasks
resource "aws_security_group" "sonarqube_tasks" {
  name        = "sonarqube-tasks-sg-david"
  description = "Allow inbound traffic to SonarQube tasks"
  vpc_id      = aws_vpc.main.id

  ingress {
    protocol        = "tcp"
    from_port       = 9000
    to_port         = 9000
    cidr_blocks     = ["0.0.0.0/0"]
  }

  # Allow outbound traffic to RDS
  egress {
    protocol        = "tcp"
    from_port       = 5432
    to_port         = 5432
    security_groups = [aws_security_group.rds_sg.id]
  }

  # Allow outbound traffic to EFS
  egress {
    protocol        = "tcp"
    from_port       = 2049
    to_port         = 2049
    security_groups = [aws_security_group.efs_sg.id]
  }

  # Allow all other outbound traffic
  egress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  tags = {
    Name = "sonarqube-sg-devops-David-site-project"
  }
  
  depends_on = [aws_vpc.main]
}

# Security group for the load balancer
resource "aws_security_group" "lb_sg" {
  name        = "lb-sg-david"
  description = "Security group for the load balancer"
  vpc_id      = aws_vpc.main.id
  
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  ingress {
    from_port   = 9000
    to_port     = 9000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  tags = {
    Name = "lb-sg-devops-David-site-project"
  }
  
  depends_on = [aws_vpc.main]
}