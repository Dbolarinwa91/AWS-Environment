
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