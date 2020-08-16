Rails.application.config.xray = {
  name: 'Renting API',
  patch: %I[net_http aws_sdk]
}