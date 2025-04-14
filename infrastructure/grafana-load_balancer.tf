# Target Group
resource "aws_lb_target_group" "grafana_tg" {
  name        = "grafana-target-group"
  port        = 3000
  protocol    = "HTTP"
  vpc_id      = aws_vpc.main.id
  target_type = "ip"
  
  health_check {
    enabled             = true
    interval            = 15
    path                = "/api/health"  # Adjust this path based on your Grafana setup
    port                = "traffic-port"
    healthy_threshold   = 3
    unhealthy_threshold = 3
    timeout             = 5
    matcher             = "200,302,303,401"
  }
    # Allow time for connections to drain before deregistering
  deregistration_delay = 60
  
  # Enable stickiness for better user experience
  stickiness {
    type            = "lb_cookie"
    cookie_duration = 259200  # 3 day
    enabled         = true
  }
  
  
  tags = {
    Name = "grafana-target-group-devops-David-site-project"
  }
}



# Dedicated Listener
resource "aws_lb_listener" "grafana" {
  load_balancer_arn = aws_lb.app_lb.arn  # Using existing ALB
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