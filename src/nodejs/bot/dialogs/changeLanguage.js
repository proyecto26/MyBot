const changeLanguage = (builder, bot) => {
  bot.dialog('/changeLanguage', [
    (session) => {
      // Prompt the user to select their preferred locale
      builder.Prompts.choice(session, "preferred_language", 'English|Español');
    },
    (session, results) => {
      var locale;
      switch (results.response.entity) {
        case 'English':
          locale = 'en';
          break;
        case 'Español':
          locale = 'es';
          break;
      }
      session.preferredLocale(locale, (err) => {
        if (!err) {
          // Locale files loaded
          session.endDialog('language_selected', results.response.entity);
        } else {
          // Error loading the language
          session.error(err);
        }
      });
    }
  ]);
};

module.exports = {
  init: changeLanguage
}