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

    token = $location.search()['code'];

    var users = function(){return _users};

    var config = {
      "client": "2565956765.18288896999",
      "authParms":  {
        "scope"       : ["read"],
        "redirect_uri": "https://happybotixds.herokuapp.com/slackAuth",

      },
    };

    if(typeof(token) == "undefined"){
      slackSvc.authorize(config.client, config.authParms);

    }else{
      slackSvc.oauth.access(config.client, clientSecret, code, function (response) {
        if(response.ok){
          //optional : preload you token for further requests
          slackSvc.InitToken(response.access_token);
        }
      });
    }


    _users = slackSvc.users.list();


    console.log(_users);

    return function (input) {
      return $location.search();
    };
  });
