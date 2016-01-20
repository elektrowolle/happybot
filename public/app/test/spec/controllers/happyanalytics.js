'use strict';

describe('Controller: HappyanalyticsCtrl', function () {

  // load the controller's module
  beforeEach(module('appApp'));

  var HappyanalyticsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HappyanalyticsCtrl = $controller('HappyanalyticsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(HappyanalyticsCtrl.awesomeThings.length).toBe(3);
  });
});
