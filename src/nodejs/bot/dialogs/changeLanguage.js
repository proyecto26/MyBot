const _ = require('lodash')

const changeLanguage = (builder, bot) => {

  const languagesSupported = [
    { key: 'en', value: 'English' },
    { key: 'es', value: 'Español' }
  ]

  return bot.dialog('/changeLanguage', [
    (session) => {
      // Prompt the user to select their preferred locale
      builder.Prompts.choice(session, "preferred_language", _.map(languagesSupported, 'value'), { listStyle: 2 })
    },
    (session, results) => {
      const language = _.find(languagesSupported, { value: results.response.entity })
      const locale = language && language.key
      session.preferredLocale(locale, (err) => {
        if (!err) {
          // Locale files loaded
          session.endDialog('language_selected', results.response.entity)
        } else {
          // Error loading the language
          session.error(err)
        }
      })
    }
  ])
}

module.exports = {
  init: changeLanguage
}