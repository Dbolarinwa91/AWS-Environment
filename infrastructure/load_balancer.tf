# ----------------------------------------
# load_balancer.tf - Application Load Balancer
# ----------------------------------------

# Application Load Balancer for the ECS service
resource "aws_lb" "app_lb" {
  name               = "david-app-lb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.lb_sg.id]
  subnets            = [
    aws_subnet.subnet_1.id,
    aws_subnet.subnet_2.id,
    aws_subnet.subnet_3.id
  ]
  
  tags = {
    Name = "alb-devops-David-site-project"
  }
  
  depends_on = [
    aws_security_group.lb_sg,
    aws_subnet.subnet_1,
    aws_subnet.subnet_2,
    aws_subnet.subnet_3
  ]
}



# Target group for SonarQube with improved health checks
resource "aws_lb_target_group" "sonarqube_tg" {
  name        = "sonarqube-tg"
  port        = 9000
  protocol    = "HTTP"
  vpc_id      = aws_vpc.main.id
  target_type = "ip"
  
  # Improved health check configuration
  health_check {
    path                = "/"
    port                = "traffic-port"
    healthy_threshold   = 3
    unhealthy_threshold = 3
    timeout             = 5
    interval            = 15
    matcher             = "200,302,303,401"  # 401 is included because SonarQube might require auth
  }
  
  # Allow time for connections to drain before deregistering
  deregistration_delay = 60
  
  # Enable stickiness for better user experience
  stickiness {
    type            = "lb_cookie"
    cookie_duration = 259200  # 1 day
    enabled         = true
  }
  
  tags = {
    Name = "sonarqube-tg-devops-David-site-project"
  }
  
  depends_on = [aws_vpc.main]
  
  lifecycle {
    create_before_destroy = true
  }
}



# ALB listener for SonarQube
resource "aws_lb_listener" "sonarqube" {
  load_balancer_arn = aws_lb.app_lb.arn
  port              = 9000
  protocol          = "HTTP"
  
  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.sonarqube_tg.arn
  }
  
  depends_on = [
    aws_lb.app_lb,
    aws_lb_target_group.sonarqube_tg
  ]
  
  lifecycle {
    create_before_destroy = true
  }
}