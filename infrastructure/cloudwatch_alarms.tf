# ----------------------------------------
# cloudwatch_alarms.tf - CloudWatch Alarms
# ----------------------------------------

# Alarm for high database CPU utilization
resource "aws_cloudwatch_metric_alarm" "rds_cpu_high" {
  alarm_name          = "sonarqube-db-cpu-utilization-high"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "3"
  metric_name         = "CPUUtilization"
  namespace           = "AWS/RDS"
  period              = "60"
  statistic           = "Average"
  threshold           = "85"
  alarm_description   = "This metric monitors RDS CPU utilization"
  alarm_actions       = []  # Add SNS topic ARN for notifications
  
  dimensions = {
    DBInstanceIdentifier = aws_db_instance.sonarqube.id
  }

  tags = {
    Name = "sonarqube-db-cpu-alarm"
  }
}

# Alarm for database free storage space
resource "aws_cloudwatch_metric_alarm" "rds_free_storage_low" {
  alarm_name          = "sonarqube-db-free-storage-low"
  comparison_operator = "LessThanThreshold"
  evaluation_periods  = "3"
  metric_name         = "FreeStorageSpace"
  namespace           = "AWS/RDS"
  period              = "60"
  statistic           = "Average"
  threshold           = "5000000000"  # 5GB in bytes
  alarm_description   = "This metric monitors RDS free storage space"
  alarm_actions       = []  # Add SNS topic ARN for notifications
  
  dimensions = {
    DBInstanceIdentifier = aws_db_instance.sonarqube.id
  }

  tags = {
    Name = "sonarqube-db-storage-alarm"
  }
}

# Alarm for ECS service health
resource "aws_cloudwatch_metric_alarm" "ecs_service_health" {
  alarm_name          = "sonarqube-service-health"
  comparison_operator = "LessThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "HealthyHostCount"
  namespace           = "AWS/ApplicationELB"
  period              = "60"
  statistic           = "Average"
  threshold           = var.min_capacity / 2  # At least half of min capacity should be healthy
  alarm_description   = "This metric monitors the number of healthy ECS tasks for SonarQube"
  alarm_actions       = []  # Add SNS topic ARN for notifications
  
  dimensions = {
    TargetGroup  = aws_lb_target_group.sonarqube_tg.arn_suffix
    LoadBalancer = aws_lb.app_lb.arn_suffix
  }

  tags = {
    Name = "sonarqube-service-health-alarm"
  }
}

# Alarm for high 5XX error rate
resource "aws_cloudwatch_metric_alarm" "alb_high_5xx" {
  alarm_name          = "sonarqube-high-5xx-errors"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "HTTPCode_Target_5XX_Count"
  namespace           = "AWS/ApplicationELB"
  period              = "60"
  statistic           = "Sum"
  threshold           = "10"  # 10 errors in 1 minute
  alarm_description   = "This metric monitors the number of 5XX errors returned by SonarQube"
  alarm_actions       = []  # Add SNS topic ARN for notifications
  
  dimensions = {
    TargetGroup  = aws_lb_target_group.sonarqube_tg.arn_suffix
    LoadBalancer = aws_lb.app_lb.arn_suffix
  }

  tags = {
    Name = "sonarqube-5xx-alarm"
  }
}

# Alarm for EFS burst credit balance low
resource "aws_cloudwatch_metric_alarm" "efs_burst_credits_low" {
  alarm_name          = "sonarqube-efs-burst-credits-low"
  comparison_operator = "LessThanThreshold"
  evaluation_periods  = "3"
  metric_name         = "BurstCreditBalance"
  namespace           = "AWS/EFS"
  period              = "300"  # 5 minutes
  statistic           = "Average"
  threshold           = "1000000000000"  # 1 trillion (this is a very large value to ensure early warning)
  alarm_description   = "This metric monitors EFS burst credit balance"
  alarm_actions       = []  # Add SNS topic ARN for notifications
  
  dimensions = {
    FileSystemId = aws_efs_file_system.sonarqube_data.id
  }

  tags = {
    Name = "sonarqube-efs-credits-alarm"
  }
}