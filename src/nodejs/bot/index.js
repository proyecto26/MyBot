/**
 * Bot Framework configuration
 */
const builder = require('botbuilder')
const botbuilder_azure = require('botbuilder-azure')
const _ = require('lodash')
const chalk = require('chalk')
const log = console.log
const localConf = require('./conf.json')

const microsoftAppId = process.env['MicrosoftAppId'] || localConf.MicrosoftAppId
const microsoftAppPassword = process.env['MicrosoftAppPassword'] || localConf.MicrosoftAppPassword
const azureWebJobsStorage = process.env['AzureWebJobsStorage'] || localConf.AzureWebJobsStorage

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
const luis = require('./luis.js')

const _initialize = (server) => {

  // Listen for messages from users 
  server.post('/api/messages', connector.listen())

  // Create your bot with a function to receive messages from the user
  const bot = new builder.UniversalBot(connector, (session, args) => {

    // Prevent open dialogs when LUIS is enabled
    if(!session.userData.luisEnabled) {
      session.beginDialog('/menu')
    }
  })
  bot.set('storage', tableStorage)
  // Do not persist userData
  //bot.set('persistUserData', false)

  // Do not persist conversationData
  //bot.set('persistConversationData', false)

  //Add the dialogs
  const menuDialog = dialogs.menu.init(bot)
  const changeLanguageDialog = dialogs.changeLanguage.init(bot)
  const requestInfoDialog = dialogs.requestInfo.init(bot)
  
  /**
   * Initialize LUIS
   */
  luis.initialize(bot)
  
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