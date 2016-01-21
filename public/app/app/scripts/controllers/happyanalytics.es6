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

    var ref = new Firebase("https://happybotixds.firebaseio.com/happy/");
    var fbResponse = $firebaseObject(ref);

    $scope.chartData = [];


    $scope.data = fbResponse;
    $scope.chartOptions = {
      chart: {
        type: 'lineChart',
        height: 450,
        margin: {
          top: 20,
          right: 20,
          bottom: 30,
          left: 40
        },
        useVoronoi: false,
        clipEdge: true,
        duration: 100,
        useInteractiveGuideline: true,
        xAxis: {
          ticks: 5,
        },
        x: (d)=>{return d[0]},
        y: (d)=>{return d[1]},

        //zoom: {
        //  enabled: true,
        //  scaleExtent: [1, 10],
        //  //useFixedDomain: false,
        //  useNiceScale: false,
        //  horizontalOff: true,
        //  verticalOff: false,
        //  unzoomEventType: 'dblclick.zoom'
        //}
      }
    };
    var calculateChartData = function (){
      $scope.chartData = [];
      for(var user in $scope.data){
        if(user.indexOf('\$') != -1 || user.indexOf('forEach') != -1) {
          continue;
        }
        var chartDate = {};

        chartDate.key = user;
        chartDate.values = [];
        for(var date in $scope.data[user]) {
          chartDate.values.push([
            parseInt(date),
            $scope.data[user][date].happydex
          ]);

        }
        console.log("push new date: ");
        console.log(chartDate);
        console.log($scope.chartData);
        $scope.chartData.push(chartDate);
      }
    };
    calculateChartData();

    $scope.chartReady = calculateChartData();

    $scope.data.$watch(()=>{
      //$scope.chartData = [];
      console.log("data changed");
      calculateChartData();

    });

  });
