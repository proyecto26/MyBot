const requestInfo = (builder, bot) => {
  bot.dialog('/requestInfo', [
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
      const locale = session.preferredLocale();
      const localizer = session.localizer;
      session.endDialog('programming_years_lang', name, userData.coding, userData.language);
    }
  ]);
}

module.exports = {
  init: requestInfo
}