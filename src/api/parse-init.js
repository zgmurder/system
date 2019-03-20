import Parse from 'parse'
const { appId, JsKey, masterKey, serverURL } = require('../../serve/config')

Parse.initialize(appId, JsKey)
Parse.masterKey = masterKey;
Parse.serverURL = serverURL



export default Parse
