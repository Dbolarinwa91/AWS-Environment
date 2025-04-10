terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}
provider "aws" {
  region = "us-east-1"
}

terraform {
  backend "s3" {
    bucket = "devops-statefile-david-site-project-123456"
    region = "us-east-1"
    key = "devops-statefile-david-site-project-123456/statefile-123456.tfstate"

  }
}