# Security Group for Grafana Tasks
resource "aws_security_group" "grafana_tasks" {
  name        = "grafana-tasks-security-group"
  description = "Allow inbound traffic to Grafana"
  vpc_id      = aws_vpc.main.id  # Using existing VPC
  
  ingress {
    protocol        = "tcp"
    from_port       = 3000  # Grafana default port
    to_port         = 3000
    security_groups = [aws_security_group.lb_sg.id]  # Assuming this is your LB security group
  }
  
  egress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  tags = {
    Name = "grafana-tasks-sg-devops-David-site-project"
  }
}

# Add a specific egress rule for EFS
resource "aws_security_group_rule" "grafana_to_efs" {
  type                     = "egress"
  from_port                = 2049
  to_port                  = 2049
  protocol                 = "tcp"
  security_group_id        = aws_security_group.grafana_tasks.id
  source_security_group_id = aws_security_group.efs_sg.id  # The security group for your EFS mount targets
}

# Security group rule to allow Grafana tasks to connect to EFS
resource "aws_security_group_rule" "efs_from_grafana" {
  type                     = "ingress"
  from_port                = 2049
  to_port                  = 2049
  protocol                 = "tcp"
  security_group_id        = aws_security_group.efs_sg.id
  source_security_group_id = aws_security_group.grafana_tasks.id
  description              = "Allow NFS access from Grafana tasks"
}
