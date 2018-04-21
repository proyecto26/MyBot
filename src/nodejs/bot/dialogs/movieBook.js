const _ = require('lodash')
const builder = require('botbuilder')

const movieBook = (bot) => {

  return bot.dialog('MovieTickets.Book', [
    (session, args, next) => {
      var intent = args.intent
      var title = builder.EntityRecognizer.findEntity(intent.entities, 'MovieTickets.MovieTitle')

      var movie = session.dialogData.movie = {
        title: title ? title.entity : ''
      }

      session.endDialog('movie_selected', movie.title)
      //https://docs.microsoft.com/en-us/azure/cognitive-services/luis/luis-nodejs-tutorial-build-bot-framework-sa
      //https://docs.microsoft.com/en-us/azure/bot-service/nodejs/bot-builder-nodejs-recognize-intent-luis
    }
  ]);
}
  
module.exports = {
  init: movieBook
}