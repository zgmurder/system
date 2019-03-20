const ParseDashboard = require('parse-dashboard')
const config = require('./config')
const dashboard = new ParseDashboard({
  'apps': [config],
  'users': [
    {
      'user': 'armysystem',
      'pass': '123456'
    }
  ]
})
module.exports = dashboard
