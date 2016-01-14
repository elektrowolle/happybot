var express = require('express');
var app = express();
// var slack = require('./slack.js');

// app.set('port', (process.env.PORT || 5000));
//
// app.use(express.static(__dirname + '/public'));
//
// // views is directory for all template files
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');
//
// app.get('/', function(request, response) {
//   response.render('pages/index');
// });
//
// app.listen(app.get('port'), function() {
//   console.log('Node app is running on port', app.get('port'));
//   slack();
// });
//

var Slack = require('slack-client');

var Slack-Token   = process.env.Slack-Token;
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
