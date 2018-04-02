const _ = require('lodash');

const menu = (builder, bot, config) => {

  let menuOptions = []

  return bot.dialog('/menu', [
    (session, args, next) => {
      config.enableLUIS = false;
      if(session.preferredLocale()) {
        next();
      }
      else {
        session.send('greeting');
        session.send('instructions');
        session.beginDialog('/changeLanguage');
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
      }));
      const options = menuOptions.map(option => option.value);

      builder.Prompts.choice(session, 'select_demo', options, { listStyle: 3 });
    },
    (session, results, next) => {
      const option = _.find(menuOptions, { value: results.response.entity })
      switch (option.key) {
        case 'request_info':
          session.beginDialog('/requestInfo');
          break;
        case 'enable_luis':
          config.enableLUIS = true;
          session.endDialog('luis_enabled');
          break;
        case 'change_language':
          session.beginDialog('/changeLanguage');
          break;
        default:
          session.send('must_select_option');
          session.reset();
          break;
      }
    }
  ]);
};
  
module.exports = {
  init: menu
}