# SSM Parameter
resource "aws_ssm_parameter" "grafana_admin_password" {
  name        = "/grafana/admin-password"
  description = "Grafana admin password"
  type        = "SecureString"
  value       = var.grafana_admin_password  # Define this variable
  
  tags = {
    Name = "grafana-admin-password-devops-David-site-project"
  }
}
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
  default     = 1
}