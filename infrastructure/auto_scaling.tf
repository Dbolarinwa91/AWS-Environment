# ----------------------------------------
# auto_scaling.tf - Auto Scaling configuration
# ----------------------------------------

# Auto Scaling for SonarQube service
resource "aws_appautoscaling_target" "sonarqube_target" {
  max_capacity       = var.max_capacity
  min_capacity       = var.min_capacity
  resource_id        = "service/${aws_ecs_cluster.main.name}/${aws_ecs_service.sonarqube.name}"
  scalable_dimension = "ecs:service:DesiredCount"
  service_namespace  = "ecs"
  
  depends_on = [aws_ecs_service.sonarqube]
}

# CPU Utilization Scaling Policy for SonarQube
resource "aws_appautoscaling_policy" "sonarqube_policy_cpu" {
  name               = "sonarqube-cpu-auto-scaling"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.sonarqube_target.resource_id
  scalable_dimension = aws_appautoscaling_target.sonarqube_target.scalable_dimension
  service_namespace  = aws_appautoscaling_target.sonarqube_target.service_namespace

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageCPUUtilization"
    }
    target_value = 70.0
    scale_in_cooldown  = 300  # 5 minutes
    scale_out_cooldown = 60   # 1 minute - faster scale out
  }
  
  depends_on = [aws_appautoscaling_target.sonarqube_target]
}

# Memory Utilization Scaling Policy
resource "aws_appautoscaling_policy" "sonarqube_policy_memory" {
  name               = "sonarqube-memory-auto-scaling"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.sonarqube_target.resource_id
  scalable_dimension = aws_appautoscaling_target.sonarqube_target.scalable_dimension
  service_namespace  = aws_appautoscaling_target.sonarqube_target.service_namespace

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageMemoryUtilization"
    }
    target_value = 75.0
    scale_in_cooldown  = 300  # 5 minutes
    scale_out_cooldown = 60   # 1 minute - faster scale out
  }
  
  depends_on = [aws_appautoscaling_target.sonarqube_target]
}

# Scale based on ALB request count - important for SonarQube under high load
resource "aws_appautoscaling_policy" "sonarqube_policy_alb_requests" {
  name               = "sonarqube-alb-request-count-scaling"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.sonarqube_target.resource_id
  scalable_dimension = aws_appautoscaling_target.sonarqube_target.scalable_dimension
  service_namespace  = aws_appautoscaling_target.sonarqube_target.service_namespace

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ALBRequestCountPerTarget"
      resource_label         = "${aws_lb.app_lb.arn_suffix}/${aws_lb_target_group.sonarqube_tg.arn_suffix}"
    }
    target_value = 500  # requests per target
    scale_in_cooldown  = 300  # 5 minutes
    scale_out_cooldown = 60   # 1 minute - faster scale out
  }
  
  depends_on = [
    aws_appautoscaling_target.sonarqube_target,
    aws_lb.app_lb,
    aws_lb_target_group.sonarqube_tg
  ]
}