var Slack = require('slack-client');
var happy = require('./happyKnowledge');

module.exports = (function () {
  var slackToken = process.env.SlackToken;
  var autoReconnect = true;
  var autoMark = true;

  var slack = new Slack(slackToken, autoReconnect, autoMark);

  var slackHooks = {};

  slack.on('open', function () {
    console.log("Connected to " + slack.team.name + " as " + slack.self.name);
  });

  slack.on('message', function (message) {
    console.log('Message:' + message);
    var channel = slack.getChannelGroupOrDMByID(message.channel);
    var user = slack.getUserByID(message.user);

    console.log("user: " + user.name);
    console.log("channel: " + channel.name);

    //var message;
    //message = new slack.Message();
    channel.send("Hi " + user.name);

    var hook = slackHooks[message.message];
    if(hook != undefined){
      hook({'message': message, 'channel': channel, 'user':user});
    }

    console.log("add happy object");

    var happy;
    happy = new happy(user.name, message.user, Date.now(), 5);
    console.log(JSON.stringify(happy));
  });

  slack.on('error', function (err) {
    console.log('Error:' + err);
  });

  slack.login();
});