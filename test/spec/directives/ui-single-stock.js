'use strict';

describe('Directive: uiSingleStock', function() {
  beforeEach(module('stockpocApp'));

  var element;

  it('should make hidden element visible', inject(function($rootScope, $compile) {
    element = angular.element('<ui-single-stock></ui-single-stock>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the uiSingleStock directive');
  }));
});
