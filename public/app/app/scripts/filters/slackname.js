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
  .filter('slackName', function (slackSvc) {
    var _users = {};
    var users = function(){return _users};
    //slackSvc.InitToken("xoxp-2565956765-10288489106-18963639669-ce936e3968",
    //  function (r) {
    //    console.log(r);
    //  });

    var config = {
      "client": "2565956765.18288896999",
      "authParms":  {
        "scope"       : ["read"],
        "redirect_uri": "https://happybotixds.herokuapp.com/#/happybotAnalytics",

      },
    };

    slackSvc.authorize(config.client, config.authParms);

    _users = slackSvc.users.list();


    console.log(_users);

    return function (input) {
      return users();
    };
  });
