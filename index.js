var express = require('express');
var app = express();
var slack = require('./slack.js');
var https = require('https');

//var podio = require('./Podio.js');

app.set('port', process.env.PORT || 5000);

app.use(express.static(__dirname + '/public/app/app'));
app.use(express.static(__dirname + '/public/app'));
//app.use(express.static(__dirname + '/views/pages'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/slackAuth', function (request, response) {
  console.log("try to authenticate Slack");
  var code = request.query.code;
  if(typeof(token) != "undefined") {
    requestify.post('https://slack.com/api/oauth.access', {
      'client_id': env.process.SlackClient,
      'client_secret': env.process.SlackSecret,
      'code': code
    }).then(function (slackResponse) {
      console.log(slackResponse);
    });
  }


});

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
  slack();
  //podio();
});

//# sourceMappingURL=index.js.map