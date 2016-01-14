var Slack = require('slack-client');

module.exports = (function (){
var slackToken   = process.env.SlackToken;
var autoReconnect = true;
var autoMark      = true;

var slack = new Slack(slackToken, autoReconnect, autoMark)


slack.on('open', function (){
  console.log("Connected to " + slack.team.name + " as " + slack.self.name);
});

slack.on('message', function (message) {
  console.log('Message:' + message);
  var channel = slack.getChannelGroupOrDMByID(message.channel);
  var user = slack.getUserByID(message.user);

  console.log("user: " + user.name);
  console.log("channel: " + channel.name);
});

slack.on('error', function (err) {
  console.log('Error:' + err);
});


slack.login();

});
