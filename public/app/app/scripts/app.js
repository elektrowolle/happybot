'use strict';

/**
 * @ngdoc overview
 * @name appApp
 * @description
 * # appApp
 *
 * Main module of the application.
 */
angular
  .module('appApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase',
    'Deg.SlackApi',
    'nvd3ChartDirectives',
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/happyAnalytics', {
        templateUrl: 'views/happyanalytics.html',
        controller: 'HappyanalyticsCtrl',
        controllerAs: 'happyAnalytics'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
