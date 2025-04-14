# Target Group
resource "aws_lb_target_group" "grafana_tg" {
  name        = "grafana-target-group"
  port        = 3000
  protocol    = "HTTP"
  vpc_id      = aws_vpc.main.id
  target_type = "ip"
  
  health_check {
    enabled             = true
    interval            = 30
    path                = "/api/health"
    port                = "traffic-port"
    healthy_threshold   = 3
    unhealthy_threshold = 3
    timeout             = 5
    matcher             = "200"
  }
  
  tags = {
    Name = "grafana-target-group-devops-David-site-project"
  }
}

# Listener Rule (Path-based routing)
resource "aws_lb_listener_rule" "grafana" {
  listener_arn = aws_lb_listener.sonarqube.arn  # Using existing listener
  priority     = 100  # Priority that doesn't conflict with existing rules
  
  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.grafana_tg.arn
  }
  
  condition {
    path_pattern {
      values = ["/grafana*"]  # Path-based routing for subpath
    }
  }
}

# Dedicated Listener
resource "aws_lb_listener" "grafana" {
  load_balancer_arn = aws_lb.main.arn  # Using existing ALB
  port              = 3000  # Grafana port
  protocol          = "HTTP"  # Change to HTTPS for production
  
  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.grafana_tg.arn
  }
  
  tags = {
    Name = "grafana-listener-devops-David-site-project"
  }
}