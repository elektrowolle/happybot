'use strict';

/**
 * @ngdoc filter
 * @name appApp.filter:slackName
 * @function
 * @description
 * # slackName
 * Filter in the appApp.
 */
angular.module('appApp')
  .filter('slackName', function (slackSvc, $location) {
    var
      _users,
      token;

    _users = {};

    token = $location.search()['token'];

    var users = function(){return _users};

    var config = {
      "client": "2565956765.18288896999",
      "authParms":  {
        "scope"       : [
          "identify",
          "channels:read",
          "team:read",
          "users:read"
        ],
        "redirect_uri": "https://happybotixds.herokuapp.com/slackAuth",

      },
    };

    if(typeof(token) == "undefined"){
      slackSvc.authorize(config.client, config.authParms);

    }else{
      slackSvc.InitToken(token);
      slackSvc.users.list(function(memberList){
        memberList.members.map(function(user){
          _users[user.id] = user.name;
        });
      });

    }

    console.log(_users);

    return function (input) {
      return users()[input];
    };
  });
