const express = require('express')
const config = require('./config')
const ParseServerObj = require('./Parse_Server')
const ParseDashboard = require('./Parse_Dashboard')
// const ParseServer = require('parse-server').ParseServer

const app = express()
// 把 Parse Server 挂载在 /parse
app.use('/parse', ParseServerObj)

// 把 Parse Dashboard 挂载在 /dashboard
app.use('/dashboard', ParseDashboard)
const httpServer = require('http').createServer(app)
httpServer.listen(config.serverPort, function() {
  console.log(`parse-server parse-dashboard are running on port ${config.serverPort}.`)
})

// ParseServer.createLiveQueryServer(httpServer)
