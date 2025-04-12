# auto_scaling.tf - Contains auto scaling configuration for ECS service

# Auto Scaling for SonarQube service
resource "aws_appautoscaling_target" "sonarqube_target" {
  max_capacity       = 9  # Maximum capacity
  min_capacity       = 3  # Minimum capacity
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
  }
  
  depends_on = [aws_appautoscaling_target.sonarqube_target]
}