var Slack = require('slack-client');
var happy = require('./happyKnowledge');
var Conversation = require('./slackConversation.js');

module.exports = (function () {
  var slackToken = process.env.SlackToken;
  var autoReconnect = true;
  var autoMark = true;

  var slack = new Slack(slackToken, autoReconnect, autoMark);

  var slackHooks        = {};
  var slackConversation = {};

  slack.on('open', function () {
    console.log("Connected to " + slack.team.name + " as " + slack.self.name);
  });

  slack.on('message', function (message) {
    console.log('Message:' + message);
    var channel = slack.getChannelGroupOrDMByID(message.channel);
    var user    = slack.getUserByID(message.user);

    console.log("user: " + user.name);
    console.log("channel: " + channel.name);

    if(slackConversation[message.user]){
      slackConversation.process(message);
    }else {

      var hook = slackHooks[message.message];
      if (hook != undefined) {
        hook({'message': message, 'channel': channel, 'user': user});
      }

    }
  });

  slackHooks['Hi'] = ((info)=>{
    slackConversation[info.message.user] = new Conversation();
  });

  slack.on('error', function (err) {
    console.log('Error:' + err);
  });

  slack.login();
});
