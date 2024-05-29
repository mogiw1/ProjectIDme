resource "google_monitoring_alert_policy" "policy" {
  display_name = "High CPU Usage"
  combiner     = "OR"
  conditions {
    display_name = "CPU usage"
    condition_threshold {
      filter = "metric.type=\"compute.googleapis.com/instance/cpu/utilization\" AND resource.type=\"gce_instance\""
      comparison = "COMPARISON_GT"
      threshold_value = 0.8
      duration = "60s"
      aggregations {
        alignment_period = "60s"
        per_series_aligner = "ALIGN_MEAN"
      }
    }
  }
  notification_channels = [google_monitoring_notification_channel.email.name]
}

resource "google_monitoring_notification_channel" "email" {
  display_name = "Email"
  type         = "email"
  labels = {
    email_address = "moh.giwa@gmail.com"
  }
}

