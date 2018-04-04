const _ = require('lodash')
const builder = require('botbuilder')

const menu = (bot) => {

  let menuOptions = []

  return bot.dialog('/menu', [
    (session, args, next) => {
      session.userData.luisEnabled = false
      if(session.preferredLocale()) {
        next()
      }
      else {
        session.send('greeting')
        session.send('instructions')
        session.beginDialog('/changeLanguage')
      }
    },
    (session) => {

      menuOptions = [
        'request_info',
        'enable_luis',
        'change_language'
      ].map(option => ({ 
        key: option, 
        value: session.gettext(option) 
      }))
      const options = menuOptions.map(option => option.value)

      builder.Prompts.choice(session, 'select_demo', options, { listStyle: 3 })
    },
    (session, results, next) => {
      const option = _.find(menuOptions, { value: results.response.entity })
      switch (option.key) {
        case 'request_info':
          session.beginDialog('/requestInfo')
          break
        case 'enable_luis':
          session.userData.luisEnabled = true
          session.endDialog('luis_enabled')
          break
        case 'change_language':
          session.beginDialog('/changeLanguage')
          break
        default:
          session.send('must_select_option')
          session.reset()
          break
      }
    }
  ])
}
  
module.exports = {
  init: menu
}