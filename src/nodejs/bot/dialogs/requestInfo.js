const requestInfo = (builder, bot) => {
  return bot.dialog('/requestInfo', [
    (session) => {
      builder.Prompts.text(session, "request_name");
    },
    (session, results) => {
      session.userData.name = results.response;
      const locale = session.preferredLocale();
      const localizer = session.localizer;
      builder.Prompts.number(session, `${results.response}, ${localizer.gettext(locale, "years_coding")}`); 
    },
    (session, results) => {
      session.userData.coding = results.response;
      builder.Prompts.choice(session, "preferred_language", ["JavaScript", "C#", "Java"]);
    },
    (session, results) => {
      const userData = session.userData
      userData.language = results.response.entity;
      const name = userData.name;
      const message = session.gettext('programming_years_lang', name, userData.coding, userData.language)
      session.endDialog(message);
    }
  ]);
}

module.exports = {
  init: requestInfo
}