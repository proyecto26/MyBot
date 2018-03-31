/**
 * Bot Framework configuration
 */
const builder = require('botbuilder');
const botbuilder_azure = require('botbuilder-azure');
const localConf = require('./conf.json');
const _ = require('lodash')

const microsoftAppId = process.env['MicrosoftAppId'] || localConf.MicrosoftAppId;
const microsoftAppPassword = process.env['MicrosoftAppPassword'] || localConf.MicrosoftAppPassword;
const azureWebJobsStorage = process.env['AzureWebJobsStorage'] || localConf.AzureWebJobsStorage;

// Create chat connector for communicating with the Bot Framework Service
const connector = new builder.ChatConnector({
  appId: microsoftAppId,
  appPassword: microsoftAppPassword,
  openIdMetadata: process.env.BotOpenIdMetadata 
});

/*----------------------------------------------------------------------------------------
* Bot Storage: This is a great spot to register the private state storage for your bot. 
* We provide adapters for Azure Table, CosmosDb, SQL Azure, or you can implement your own!
* For samples and documentation, see: https://github.com/Microsoft/BotBuilder-Azure
* ---------------------------------------------------------------------------------------- */

const tableName = 'botdata';
const azureTableClient = new botbuilder_azure.AzureTableClient(tableName, azureWebJobsStorage);
const tableStorage = new botbuilder_azure.AzureBotStorage({ gzipData: false }, azureTableClient);

/**
 * Dialogs
 */
const changeLanguageDialog = require('./dialogs/changeLanguage')
const requestInfoDialog = require('./dialogs/requestInfo')

const _initialize = (server) => {

  // Listen for messages from users 
  server.post('/api/messages', connector.listen());

  let langSelected = false;
  let menu = []

  // Create your bot with a function to receive messages from the user
  const bot = new builder.UniversalBot(connector, [
    (session, args, next) => {
      if(langSelected || 
        session.preferredLocale()) {
        next()
      }
      else {
        session.send('greeting');
        session.send('instructions');
        session.beginDialog('/changeLanguage');
        langSelected = true;
      }
    },
    (session) => {
      const locale = session.preferredLocale();
      const localizer = session.localizer;

      menu = [
        'request_info',
        'change_language'
      ].map(option => ({ 
        key: option, 
        value: localizer.gettext(locale, option) 
      }));
      const options = menu.map(option => option.value);

      builder.Prompts.choice(session, 'select_demo', options, { listStyle: 3 });
    },
    (session, results) => {
      const option = _.find(menu, { value: results.response.entity })
      switch (option.key) {
        case 'request_info':
          session.beginDialog('/requestInfo');
          break;
        case 'change_language':
          session.beginDialog('/changeLanguage');
          break;
      }
    }
  ]);
  bot.set('storage', tableStorage);

  changeLanguageDialog.init(builder, bot);
  requestInfoDialog.init(builder, bot);
}

module.exports = {
  initialize: _initialize
};