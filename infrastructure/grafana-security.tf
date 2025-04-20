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

# CHANGED: Renamed from "efs" to "efs_sg" to match references in security group rules
resource "aws_security_group" "efs_sg" {
  name        = "efs-security-group"
  description = "Allow NFS traffic from Grafana tasks"
  vpc_id      = aws_vpc.main.id

  # Allow inbound NFS traffic from Grafana tasks
  ingress {
    protocol        = "tcp"
    from_port       = 2049
    to_port         = 2049
    security_groups = [aws_security_group.grafana_tasks.id]
    # ADDED: Description for clarity
    description     = "Allow NFS traffic from Grafana tasks"
  }

  egress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    # CHANGED: Updated tag to reflect the resource name
    Name = "efs-sg-devops-David-site-project"
  }
}

# COMMENTED OUT: Removed redundant rule that conflicts with the inline ingress rule in efs_sg
# This rule is causing conflicts because it's trying to add the same rule that already exists
# resource "aws_security_group_rule" "efs_from_grafana" {
#   type                     = "ingress"
#   from_port                = 2049
#   to_port                  = 2049
#   protocol                 = "tcp"
#   security_group_id        = aws_security_group.efs_sg.id
#   source_security_group_id = aws_security_group.grafana_tasks.id
#   description              = "Allow NFS traffic from Grafana tasks"
# }

# COMMENTED OUT: Removed redundant rule that conflicts with the all-traffic egress rule in grafana_tasks
# The existing "-1" protocol egress rule already allows all outbound traffic including to EFS
# resource "aws_security_group_rule" "grafana_to_efs" {
#   type                     = "egress"
#   from_port                = 2049
#   to_port                  = 2049
#   protocol                 = "tcp"
#   security_group_id        = aws_security_group.grafana_tasks.id
#   source_security_group_id = aws_security_group.efs_sg.id
#   description              = "Allow outbound NFS traffic to EFS"
# }