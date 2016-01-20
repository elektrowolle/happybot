'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:HappyanalyticsCtrl
 * @description
 * # HappyanalyticsCtrl
 * Controller of the appApp
 */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HappyKnowledge = function HappyKnowledge(user, slackId, date, happydex, id) {
  _classCallCheck(this, HappyKnowledge);

  if ((typeof user === 'undefined' ? 'undefined' : _typeof(user)) == 'object') {
    this.id = user.id;
    this.user = user.user;
    this.slackId = user.slackId;
    this.date = user.date;
    this.happydex = user.happydex;
  } else {
    this.id = id;
    this.user = user;
    this.slackId = slackId;
    this.date = date;
    this.happydex = happydex;
  }

  var fireBaseRefUrl = process.env.firebaseRoot + '/' + this.slackId + '/' + this.date;
  this.fire = new Firebase(fireBaseRefUrl);
  //process.env.firebaseRoot);

  console.log("new Knowledge (" + fireBaseRefUrl + "): ");
  console.log(this);
};

;

angular.module('appApp').controller('HappyanalyticsCtrl', function ($scope, $firebaseObject, $filter) {
  var ref = new Firebase("https://happybotixds.firebaseio.com/happy/");

  var fbResponse = $firebaseObject(ref);
  $scope.data = fbResponse;
  $scope.data.$watch(function () {
    for (var user in $scope.data) {}
  });
});

//# sourceMappingURL=happyanalytics.js.map