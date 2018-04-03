/**
 * Bot Framework configuration
 */
const builder = require('botbuilder')
const botbuilder_azure = require('botbuilder-azure')
const localConf = require('./conf.json')
const _ = require('lodash')
const chalk = require('chalk')
const log = console.log

const microsoftAppId = process.env['MicrosoftAppId'] || localConf.MicrosoftAppId
const microsoftAppPassword = process.env['MicrosoftAppPassword'] || localConf.MicrosoftAppPassword
const azureWebJobsStorage = process.env['AzureWebJobsStorage'] || localConf.AzureWebJobsStorage

const luisAppIdEnglish = process.env['LuisAppId_English'] || process.env['LuisAppId'] || localConf.LuisAppId_English
const luisAppIdSpanish = process.env['LuisAppId_Spanish'] || localConf.LuisAppId_Spanish
const luisAPIKey = process.env['LuisAPIKey'] || localConf.LuisAPIKey
const luisAPIHostName = process.env['LuisAPIHostName'] || localConf.LuisAPIHostName

// Create chat connector for communicating with the Bot Framework Service
const connector = new builder.ChatConnector({
  appId: microsoftAppId,
  appPassword: microsoftAppPassword,
  openIdMetadata: process.env.BotOpenIdMetadata 
})

/*----------------------------------------------------------------------------------------
* Bot Storage: This is a great spot to register the private state storage for your bot. 
* We provide adapters for Azure Table, CosmosDb, SQL Azure, or you can implement your own!
* For samples and documentation, see: https://github.com/Microsoft/BotBuilder-Azure
* ---------------------------------------------------------------------------------------- */

const tableName = 'botdata'
const azureTableClient = new botbuilder_azure.AzureTableClient(tableName, azureWebJobsStorage)
const tableStorage = new botbuilder_azure.AzureBotStorage({ gzipData: false }, azureTableClient)

const dialogs = require('require-all')(__dirname + '/dialogs')

const _initialize = (server) => {

  // Listen for messages from users 
  server.post('/api/messages', connector.listen())

  // Create your bot with a function to receive messages from the user
  const bot = new builder.UniversalBot(connector, (session, args) => {

    /**
     * Prevent open dialogs when LUIS is enabled
     */
    if(!session.userData.luisEnabled) {
      session.beginDialog('/menu')
    }
  })
  bot.set('storage', tableStorage)
  // Do not persist userData
  //bot.set('persistUserData', false)

  // Do not persist conversationData
  //bot.set('persistConversationData', false)

  //Add dialogs
  const menuDialog = dialogs.menu.init(builder, bot)
  const changeLanguageDialog = dialogs.changeLanguage.init(builder, bot)
  const requestInfoDialog = dialogs.requestInfo.init(builder, bot)

  /**
   * LUIS Configuration
   */
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
  
  bot.customAction({
    matches: /exit/gi,
    onSelectAction: (session, args, next) => {
      session.userData.luisEnabled = false
      session.reset()
    }
  })
}

module.exports = {
  initialize: _initialize
}