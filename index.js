var express = require('express');
var app = express();
var slack = require('./slack.js');
var https = require('https');
var requestify = require('requestify');

//var podio = require('./Podio.js');

app.set('port', process.env.PORT || 5000);

app.use(express.static(__dirname + '/public/app/app'));
app.use(express.static(__dirname + '/public/app'));
//app.use(express.static(__dirname + '/views/pages'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var getSlackToken = function (slackAuthConfig, response) {
  requestify
      .get('https://slack.com/api/oauth.access', slackAuthConfig)
      .then(function (slackResponse) {
                  console.log(slackResponse);

                  var body = JSON.parse(slackResponse.body);

                  console.log("body: " + body);
                  console.log("body.ok: " + body.ok);
                  if(body.ok){
                    console.log("authenticated");
                    response.redirect(
                        "https://happybotixds.herokuapp.com/#/happyAnalytics?token=" +
                        body.access_token
                    );
                  }else{
                    console.log("couldn't authenticate");
                    response.redirect("https://happybotixds.herokuapp.com/");
                      }
                  }
      );
};
var authenticateSlackRequest = function (request, response) {
  console.log("try to authenticate Slack");
  var code = request.query.code;
  if(typeof(code) != "undefined") {
    console.log("start request");
    var slackAuthConfig = {
      params: {
        client_id    : process.env.SlackClient,
        client_secret: process.env.SlackSecret,
        code         : code,
        redirect_uri : 'https://happybotixds.herokuapp.com/slackAuth',
      }
    };

    console.log('payload: ');
    console.log(slackAuthConfig);

    getSlackToken(slackAuthConfig, response);
  }


};
app.get('/slackAuth', authenticateSlackRequest);

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
  slack();
  //podio();
});

//# sourceMappingURL=index.js.map