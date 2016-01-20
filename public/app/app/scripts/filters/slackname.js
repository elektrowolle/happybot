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


    if(typeof(token) == "undefined"){
      var config = {
        "client": "2565956765.18288896999",
        "authParms":  {
          "scope"       : ["read"],
          "redirect_uri": "https://happybotixds.herokuapp.com/#/happyAnalytics",

        },
      };

      slackSvc.authorize(config.client, config.authParms);

    }


    _users = slackSvc.users.list();


    console.log(_users);

    return function (input) {
      return $location.search();
    };
  });
