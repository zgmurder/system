if (process.env.IS_BROWSER) {
  console.log('browser env')
    module.exports = require('parse')
} else {
  console.log('node env')
    module.exports = require('parse/node')
}
