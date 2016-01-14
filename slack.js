var Slack = require('slack-client');

var slackToken   = process.env.SlackToken;
var autoReconnect = true;
var autoMark      = true;

slack = new Slack(slackToken, autoReconnect, autoMark)


slack.on('open', function (){
  console.log("Connected to " + slack.team.name + " as " + slack.self.name);
});

slack.on('message', function (message) {
  console.log('Message:' + message);
});

slack.on('error', function (err) {
  console.log('Error:' + err);
});


slack.login();
