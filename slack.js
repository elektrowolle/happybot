'use strict';

var Slack = require('slack-client');
var happy = require('./happyKnowledge');
var Conversation = require('./SlackConversation.js');

module.exports = function () {
  var slackToken = process.env.SlackToken;
  var autoReconnect = true;
  var autoMark = true;

  var slack = new Slack(slackToken, autoReconnect, autoMark);

  var slackHooks = {};
  var slackConversation = {};

  slack.on('open', function () {
    console.log("Connected to " + slack.team.name + " as " + slack.self.name);
  });

  slack.on('message', function (message) {
    console.log('Message:' + message);
    var channel = slack.getChannelGroupOrDMByID(message.channel);
    var user = slack.getUserByID(message.user);

    console.log("user: " + user.name);
    console.log("channel: " + channel.name);

    if (slackConversation[message.user] != undefined) {
      console.log('continue conversation');
      slackConversation.process(message);
    } else {

      var hook = slackHooks[message.text];
      if (hook != undefined) {
        console.log('follow hook');
        hook({ 'message': message, 'channel': channel, 'user': user });
      } else {
        console.log('not sure what to do');
        channel.send('Hi! How can I help you?');
      }
    }
  });

  slackHooks['Hi'] = function (info) {
    slackConversation[info.message.user] = new Conversation();
  };

  slack.on('error', function (err) {
    console.log('Error:' + err);
  });

  slack.login();
};

//# sourceMappingURL=slack.js.map