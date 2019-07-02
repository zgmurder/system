const ParseServer = require('parse-server').ParseServer
const config = require('./config')
const api = new ParseServer(config)
module.exports = api
