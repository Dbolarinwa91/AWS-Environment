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
    path                = "/grafana/api/health"  # Adjust this path based on your Grafana setup
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
  port              = 80  # Grafana port
  protocol          = "HTTP"  # Change to HTTPS for production
  
  default_action {
    type = "fixed-response"
    fixed_response {
      content_type = "text/plain"
      message_body = "Service not found"
      status_code  = "404"
    }
  }
  
  tags = {
    Name = "grafana-listener-devops-David-site-project"
  }
}

# Grafana listener rule
resource "aws_lb_listener_rule" "grafana" {
  listener_arn = aws_lb_listener.grafana.arn
  priority     = 100
  
  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.grafana_tg.arn
  }
  
  condition {
    path_pattern {
      values = ["/grafana*"]
    }
  }
  
  tags = {
    Name = "grafana-rule-devops-David-site-project"
  }
}