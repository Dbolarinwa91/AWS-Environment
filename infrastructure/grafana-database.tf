# EFS Access Point
resource "aws_efs_access_point" "grafana_data" {
  file_system_id = aws_efs_file_system.sonarqube.id  # Reusing existing EFS
  
  posix_user {
    gid = 472  # Default Grafana UID
    uid = 472  # Default Grafana GID
  }
  
  root_directory {
    path = "/grafana-data"
    creation_info {
      owner_gid   = 472
      owner_uid   = 472
      permissions = "755"
    }
  }
  
  tags = {
    Name = "grafana-data-access-point-devops-David-site-project"
  }
}

