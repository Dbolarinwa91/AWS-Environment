# outputs.tf

# VPC
output "vpc_id" {
  description = "ID of the created VPC"
  value       = aws_vpc.main.id
}

output "vpc_cidr" {
  description = "CIDR block of the created VPC"
  value       = aws_vpc.main.cidr_block
}

# Subnets
output "subnet_1_id" {
  description = "ID of subnet 1"
  value       = aws_subnet.subnet_1.id
}

output "subnet_2_id" {
  description = "ID of subnet 2"
  value       = aws_subnet.subnet_2.id
}

output "subnet_3_id" {
  description = "ID of subnet 3"
  value       = aws_subnet.subnet_3.id
}

output "subnet_1_cidr" {
  description = "CIDR block of subnet 1"
  value       = aws_subnet.subnet_1.cidr_block
}

output "subnet_2_cidr" {
  description = "CIDR block of subnet 2"
  value       = aws_subnet.subnet_2.cidr_block
}

output "subnet_3_cidr" {
  description = "CIDR block of subnet 3"
  value       = aws_subnet.subnet_3.cidr_block
}

# Internet Gateway
output "internet_gateway_id" {
  description = "ID of the created Internet Gateway"
  value       = aws_internet_gateway.internet_gw.id
}

# Route Table
output "route_table_id" {
  description = "ID of the created Route Table"
  value       = aws_route_table.route_table.id
}