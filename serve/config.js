
const serverPort = 1440
module.exports = {
  'serverPort': serverPort,
  'serverURL': `http://localhost:${serverPort}/parse`,
  'databaseURI': 'mongodb://armysystem2:topzen123@127.0.0.1:27017/armysystem2', // mongodb://admin:123456@localhost/
  'appId': '7269F0A31FC620688AAE12AAD9E3CD85',
  'masterKey': '7269F0A31FC620688AAE12AAD9E3CD85',
  'JsKey': '7269F0A31FC620688AAE12AAD9E3CD85',
  'appName': 'armysystem2',
  liveQuery: { classNames: ['DailyReport'] }
}
