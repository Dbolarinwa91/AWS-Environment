# ----------------------------------------
# security.tf - Security Groups
# ----------------------------------------



# Security Group for SonarQube Tasks - without cyclic references
resource "aws_security_group" "sonarqube_tasks" {
  name        = "sonarqube-tasks-sg-david"
  description = "Allow inbound traffic to SonarQube tasks"
  vpc_id      = aws_vpc.main.id

  ingress {
    protocol    = "tcp"
    from_port   = 9000
    to_port     = 9000
    cidr_blocks = ["0.0.0.0/0"]
  }

 
  # Allow all outbound traffic - we'll add specific rules later
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
    from_port   = 3000
    to_port     = 3000
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

# Security group for EFS access
resource "aws_security_group" "efs_sg" {
  name        = "sonarqube-efs-sg"
  description = "Allow EFS access from SonarQube ECS tasks"
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
    Name = "sonarqube-efs-sg-devops-David-site-project"
  }
}
