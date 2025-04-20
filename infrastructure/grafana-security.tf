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
