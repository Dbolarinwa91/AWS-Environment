# this is the main file for the infrastructure
# it contains the VPC, subnets, internet gateway, route table, and  an  ECS Clusters 
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  enable_dns_hostnames = true
  tags = {
    Name = "vpc-1-devops-David-site-project"
  }
}

resource "aws_subnet" "subnet_1" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.0.0/20"
  availability_zone       = "us-east-1b"
  map_public_ip_on_launch = true
  tags = {
    Name = "subnet_1-devops-David-site-project"
}
}

resource "aws_subnet" "subnet_2" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.16.0/20"
  availability_zone       = "us-east-1c"
  map_public_ip_on_launch = true
    tags = {
    Name = "subnet_2-devops-David-site-project"
}
}

resource "aws_subnet" "subnet_3" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.32.0/20"
  availability_zone       = "us-east-1d"
  map_public_ip_on_launch = true
    tags = {
    Name = "subnet_3-devops-David-site-project"
}
}

resource "aws_internet_gateway" "internet_gw" {
  vpc_id = aws_vpc.main.id
  tags = {
    Name = "internet_gw-devops-David-site-project"
  }
}

resource "aws_route_table" "route_table" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.internet_gw.id
    
  }

  route {
    cidr_block = "10.0.0.0/16"
    gateway_id = "local"
  }
}

resource "aws_route_table_association" "subnet_1_association" {
  subnet_id      = aws_subnet.subnet_1.id
  route_table_id = aws_route_table.route_table.id
}

resource "aws_route_table_association" "subnet_2_association" {
  subnet_id      = aws_subnet.subnet_2.id
  route_table_id = aws_route_table.route_table.id
}

resource "aws_route_table_association" "subnet_3_association" {
  subnet_id      = aws_subnet.subnet_3.id
  route_table_id = aws_route_table.route_table.id
}


/*  [Making a new bucket ] depends_on = [aws_instance.web_server] */
/*
module "s3_bucket" {
  source = "terraform-aws-modules/s3-bucket/aws"

  bucket = "devops-statefile-david-site-project-1234567"
  acl    = "private"
  force_destroy = false
  control_object_ownership = true
  object_ownership         = "ObjectWriter"

  versioning = {
    enabled = true
  }
 }
*/ 