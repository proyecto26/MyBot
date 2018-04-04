const builder = require('botbuilder')

const requestInfo = (bot) => {
  return bot.dialog('/requestInfo', [
    (session) => {
      builder.Prompts.text(session, "request_name");
    },
    (session, results) => {
      session.userData.name = results.response;
      session.save();
      const locale = session.preferredLocale();
      const localizer = session.localizer;
      builder.Prompts.number(session, `${results.response}, ${localizer.gettext(locale, "years_coding")}`); 
    },
    (session, results) => {
      session.dialogData.coding = results.response;
      builder.Prompts.choice(session, "preferred_language", ["JavaScript", "C#", "Java"]);
    },
    (session, results) => {
      const userData = session.userData
      const dialogData = session.dialogData;
      const message = session.gettext('programming_years_lang', userData.name, dialogData.coding, results.response.entity)
      session.endDialog(message);
    }
  ]);
}

module.exports = {
  init: requestInfo
}