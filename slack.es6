var Slack = require('slack-client');
var happy = require('./HappyKnowledge');
var Conversation = require('./SlackConversation.js');
var HappinessConversation = require('./HappinessConversation.js');

module.exports = (function () {
  var slackToken = process.env.SlackToken;
  var autoReconnect = true;
  var autoMark = true;

  var slack = new Slack(slackToken, autoReconnect, autoMark);

  var slackHooks        = {};
  var slackConversation = {};

  var getSlackHooks = function(){
    return slackHooks;
  };

  slack.on('open', function () {
    console.log("Connected to " + slack.team.name + " as " + slack.self.name);
  });

  slack.on('message', function (message) {
    var user;
    var channel;
    console.log('Message:' + message);
    channel = slack.getChannelGroupOrDMByID(message.channel);
    user    = slack.getUserByID(message.user);

    console.log("user: " + user.name);
    console.log("channel: " + channel.name);


    if(slackConversation[message.user] != undefined){
      console.log('continue conversation');
      slackConversation[message.user].process(message);
      if(conversation.done){
        delete slackConversation[message.user];
      }
    }else {

      var hook = slackHooks[message.text];
      if (hook != undefined) {
        console.log('follow hook');
        hook({'message': message, 'channel': channel, 'user': user});
      }else{
        console.log('not sure what to do');
        channel.send('Hi! How can I help you?');
        channel.send('Shall we talk about ' + JSON.stringify(getSlackHooks()));
      }
    }
  });

  slackHooks['Hi'] = ((info)=>{
    slackConversation[info.message.user] = new Conversation(slack, info.channel, info.user);
  });

  slackHooks['Happy'] = ((info)=>{
    slackConversation[info.message.user] = new HappinessConversation(slack, info.channel, info.user);
  });

  slack.on('error', function (err) {
    console.log('Error:' + err);
  });

  slack.login();
});
