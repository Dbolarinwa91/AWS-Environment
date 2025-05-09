#### this needs to be added to the grafana-variable.tf file
variable "grafana_admin_password" { 
    description = "Admin password for Grafana"
    type        = string
    sensitive   = true
    default     = "admin"  # Replace with a secure password or use Terraform Vault provider
  
}

variable "grafana_instance_count" {
  description = "Number of Grafana instances to run"
  type        = number
  default     = 3
}

variable "grafana_health_check_grace_period" {
  description = "The health check grace period in seconds"
  type        = number
  default     = 300
}