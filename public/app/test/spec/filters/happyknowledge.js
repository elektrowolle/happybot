'use strict';

describe('Filter: happyKnowledge', function () {

  // load the filter's module
  beforeEach(module('appApp'));

  // initialize a new instance of the filter before each test
  var happyKnowledge;
  beforeEach(inject(function ($filter) {
    happyKnowledge = $filter('happyKnowledge');
  }));

  it('should return the input prefixed with "happyKnowledge filter:"', function () {
    var text = 'angularjs';
    expect(happyKnowledge(text)).toBe('happyKnowledge filter: ' + text);
  });

});
