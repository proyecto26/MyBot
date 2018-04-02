const greeting = (builder, bot) => {
  return bot.dialog('/greeting', [
    (session) => {
      session.send('greetings');
      session.endDialog();
    }
  ]);
};

module.exports = {
  init: greeting
}