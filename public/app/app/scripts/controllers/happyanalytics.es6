'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:HappyanalyticsCtrl
 * @description
 * # HappyanalyticsCtrl
 * Controller of the appApp
 */

class HappyKnowledge {

  constructor(user, slackId, date, happydex, id) {
    if(typeof(user) == 'object'){
      this.id       = user.id;
      this.user     = user.user;
      this.slackId  = user.slackId;
      this.date     = user.date;
      this.happydex = user.happydex;
    }else {
      this.id       = id;
      this.user     = user;
      this.slackId  = slackId;
      this.date     = date;
      this.happydex = happydex;
    }

    var fireBaseRefUrl = process.env.firebaseRoot + '/' + this.slackId + '/' + this.date;
    this.fire = new Firebase(
      fireBaseRefUrl);
    //process.env.firebaseRoot);

    console.log("new Knowledge (" + fireBaseRefUrl + "): ");
    console.log(this);
  }
};

angular.module('appApp')
  .controller('HappyanalyticsCtrl', function (
    $scope,
    $firebaseObject,
    $filter
  )
  {
    $scope.chartData = {};

    var ref = new Firebase("https://happybotixds.firebaseio.com/happy/");

    var fbResponse = $firebaseObject(ref);
    $scope.data = fbResponse;
    $scope.data.$watch(()=>{
      for(var user in $scope.data){
        $scope.chartData[user] = {};
        $scope.chartData[user].values = [];
        for(var date in $scope.data[user]) {
          $scope.chartData[user].values.push([date, $scope.data[user][date].happydex]);

        }
      }
    });

  });
