/**
 * Bot Framework configuration
 */
const builder = require('botbuilder');
const botbuilder_azure = require("botbuilder-azure");
const localConf = require('./conf.json');

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
const localePicker = require('./dialogs/localePicker')
const helloDialog = require('./dialogs/helloDialog')

const _initialize = (server) => {

  // Listen for messages from users 
  server.post('/api/messages', connector.listen());

  // Create your bot with a function to receive messages from the user
  const bot = new builder.UniversalBot(connector, [
    (session) => {
        session.send("greeting");
        session.send("instructions");
        session.beginDialog('/localePicker');
    },
    (session) => {
        //builder.Prompts.text(session, "text_prompt");
        session.beginDialog('/helloDialog');
    }
  ]);
  bot.set('storage', tableStorage);

  localePicker.init(builder, bot);
  helloDialog.init(builder, bot);
}

module.exports = {
  initialize: _initialize
};