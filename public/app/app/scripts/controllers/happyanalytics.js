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

var chartOptions = {
  chart: {
    type: 'stackedAreaChart',
    height: 450,
    margin: {
      top: 20,
      right: 20,
      bottom: 30,
      left: 40
    },
    x: function x(d) {
      return d[0];
    },
    y: function y(d) {
      return d[1];
    },
    useVoronoi: false,
    clipEdge: true,
    duration: 100,
    useInteractiveGuideline: true,
    xAxis: {
      showMaxMin: false,
      tickFormat: function tickFormat(d) {
        return d3.time.format('%x')(new Date(d));
      }
    },
    yAxis: {
      tickFormat: function tickFormat(d) {
        return d3.format(',.2f')(d);
      }
    },
    zoom: {
      enabled: true,
      scaleExtent: [1, 10],
      useFixedDomain: false,
      useNiceScale: false,
      horizontalOff: false,
      verticalOff: true,
      unzoomEventType: 'dblclick.zoom'
    }
  }
};

angular.module('appApp').controller('HappyanalyticsCtrl', function ($scope, $firebaseObject, $filter) {

  var ref = new Firebase("https://happybotixds.firebaseio.com/happy/");
  var fbResponse = $firebaseObject(ref);

  $scope.chartData = [];

  $scope.data = fbResponse;
  $scope.chartOptions = chartOptions;

  var calculateChartData = function calculateChartData() {
    for (var user in $scope.data) {
      //if(user.indexOf('\$') == -1) {
      //  continue;
      //}

      var chartDate = {};
      chartDate.key = user;
      chartDate.values = [];
      for (var date in $scope.data[user]) {
        chartDate.values.push([date, $scope.data[user][date].happydex]);
      }
      $scope.chartData.push = chartDate;
    }
  };

  calculateChartData();

  $scope.data.$watch(function () {
    //$scope.chartData = [];
    console.log("data changed");
    calculateChartData();
  });
});

//# sourceMappingURL=happyanalytics.js.map