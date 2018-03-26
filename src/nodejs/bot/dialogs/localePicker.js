const localePicker = (builder, bot) => {
  bot.dialog('/localePicker', [
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
          session.endDialog();
        } else {
          // Problem loading the selected locale
          session.error(err);
        }
      });
    }
  ]);
};

module.exports = {
  init: localePicker
}