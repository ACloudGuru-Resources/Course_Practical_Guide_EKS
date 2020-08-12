Rails.application.config.xray = {
  name: 'my app',
  patch: %I[net_http aws_sdk]
}