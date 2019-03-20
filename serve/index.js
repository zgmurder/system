const express = require('express')
const config = require('./config')
const ParseServer = require('./Parse_Server')
const ParseDashboard = require('./Parse_Dashboard')

const app = express()
// 把 Parse Server 挂载在 /parse
app.use('/parse', ParseServer)

// 把 Parse Dashboard 挂载在 /dashboard
app.use('/dashboard', ParseDashboard)
const httpServer = require('http').createServer(app)
httpServer.listen(config.serverPort, function() {
  console.log('parse-server parse-dashboard are running on port 1337.')
})
