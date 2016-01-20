'use strict';

/**
 * @ngdoc directive
 * @name appApp.directive:happyKnowledgePanel
 * @description
 * # happyKnowledgePanel
 */
angular.module('appApp')
  .directive('happyKnowledgePanel', function () {
    return {
      restrict: 'EA',
      scope: {
        date     : '@',
        user     : '=',
        knowledge: '=',
      },
      templateUrl: 'views/happyKnowledgePanel.html',
    };
  });
