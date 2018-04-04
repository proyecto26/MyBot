/**
 * LUIS Configuration
 */
const builder = require('botbuilder')
const chalk = require('chalk')
const log = console.log
const localConf = require('./conf.json')

const luisAppIdEnglish = process.env['LuisAppId_English'] || process.env['LuisAppId'] || localConf.LuisAppId_English
const luisAppIdSpanish = process.env['LuisAppId_Spanish'] || localConf.LuisAppId_Spanish
const luisAPIKey = process.env['LuisAPIKey'] || localConf.LuisAPIKey
const luisAPIHostName = process.env['LuisAPIHostName'] || localConf.LuisAPIHostName

const _initialize = (bot) => {
  
  const recognizer = new builder.LuisRecognizer({
    //add a single model or model by language
    'en': `https://${luisAPIHostName}/luis/v2.0/apps/${luisAppIdEnglish}?subscription-key=${luisAPIKey}&verbose=true&timezoneOffset=0&q=`,
    'es': `https://${luisAPIHostName}/luis/v2.0/apps/${luisAppIdSpanish}?subscription-key=${luisAPIKey}&verbose=true&timezoneOffset=0&q=`
  })
  .onEnabled((session, callback) => {
    //Prevent enable LUIS while the dialogs are running
    //const enabled = session.dialogStack().length == 0

    const enabled = session.userData.luisEnabled
    log(chalk.green(`LUIS ENABLED: ${enabled}`))
    callback(null, enabled)
  })
  bot.recognizer(recognizer)

  bot.dialog('/greeting', (session) => session.send('greetings'))
  .triggerAction({ matches: 'Greeting' })

  bot.dialog('/leave', (session) => session.send('leave'))
  .triggerAction({ matches: 'Leave' })

  bot.dialog('/none', (session) => session.send('dont_understand_you'))
  .triggerAction({ matches: 'None' })
}

module.exports = {
  initialize: _initialize
}