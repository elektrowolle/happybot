'use strict';

describe('Filter: slackName', function () {

  // load the filter's module
  beforeEach(module('appApp'));

  // initialize a new instance of the filter before each test
  var slackName;
  beforeEach(inject(function ($filter) {
    slackName = $filter('slackName');
  }));

  it('should return the input prefixed with "slackName filter:"', function () {
    var text = 'angularjs';
    expect(slackName(text)).toBe('slackName filter: ' + text);
  });

});
