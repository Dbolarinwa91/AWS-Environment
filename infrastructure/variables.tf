# ----------------------------------------
# variables.tf - Input variables configuration
# ----------------------------------------

variable "aws_region" {
  description = "AWS region where resources will be created"
  type        = string
  default     = "us-east-1"
}

# EFS configuration
variable "efs_performance_mode" {
  description = "EFS performance mode for SonarQube data"
  type        = string
  default     = "generalPurpose"  # Alternative: maxIO
}

variable "efs_throughput_mode" {
  description = "EFS throughput mode for SonarQube data"
  type        = string
  default     = "bursting"  # Alternative: provisioned
}

variable "efs_encrypted" {
  description = "Enable EFS encryption at rest"
  type        = bool
  default     = true
}

variable "efs_lifecycle_policy" {
  description = "EFS lifecycle policy"
  type        = string
  default     = "AFTER_30_DAYS"  # Move files to infrequent access storage after 30 days
}

variable "efs_transition_to_ia" {
  description = "EFS transition to IA storage class"
  type        = string
  default     = "AFTER_30_DAYS"
}

# Database configuration
variable "db_instance_class" {
  description = "RDS instance class"
  type        = string
  default     = "db.t3.medium"
}

variable "db_allocated_storage" {
  description = "Allocated storage for RDS instance in GB"
  type        = number
  default     = 20
}

variable "db_name" {
  description = "Database name"
  type        = string
  default     = "sonarqube"
}

variable "db_username" {
  description = "Database master username"
  type        = string
  default     = "sonarqube"
  sensitive   = true
}

variable "db_password" {
  description = "Database master password"
  type        = string
  default     = "sonarqube-password-change-me"  # Should be overridden in terraform.tfvars
  sensitive   = true
}

# SonarQube high availability configuration
variable "sonarqube_instance_count" {
  description = "Number of SonarQube instances to run"
  type        = number
  default     = 3  # One per AZ for maximum availability
}

variable "sonarqube_health_check_grace_period" {
  description = "The health check grace period in seconds"
  type        = number
  default     = 300
}

# Auto scaling configuration
variable "min_capacity" {
  description = "Minimum number of instances"
  type        = number
  default     = 3
}

variable "max_capacity" {
  description = "Maximum number of instances"
  type        = number
  default     = 6
}