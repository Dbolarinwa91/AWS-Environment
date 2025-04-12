# ----------------------------------------
# route53.tf - DNS Configuration (commented out)
# ----------------------------------------

/*
variable "domain_name" {
  description = "Domain name for SonarQube"
  type        = string
  default     = "example.com"  # Replace with your domain
}

variable "sonarqube_subdomain" {
  description = "Subdomain for SonarQube"
  type        = string
  default     = "sonarqube"  # Will create sonarqube.example.com
}

# Look up existing hosted zone
data "aws_route53_zone" "selected" {
  name         = var.domain_name
  private_zone = false
}

# Create DNS record for SonarQube
resource "aws_route53_record" "sonarqube" {
  zone_id = data.aws_route53_zone.selected.zone_id
  name    = "${var.sonarqube_subdomain}.${var.domain_name}"
  type    = "A"

  alias {
    name                   = aws_lb.app_lb.dns_name
    zone_id                = aws_lb.app_lb.zone_id
    evaluate_target_health = true
  }
}

# Output the full domain for SonarQube
output "sonarqube_url_with_domain" {
  description = "The URL to access SonarQube using the domain"
  value       = "http://${aws_route53_record.sonarqube.name}"
}
*/