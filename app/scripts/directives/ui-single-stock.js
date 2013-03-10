'use strict';

stockpocApp.directive('uiSingleStock', function () {
    return {
        templateUrl: 'views/single-stock.html',
        restrict: 'A',
        controller: 'SingleStockCtrl',
        link: function postLink(scope, element, attrs) {
            element.find('[type-head-input]').bind('keypress', function(e){
                var code = (e.keyCode ? e.keyCode : e.which);
                if(code == 13) {
                    scope.$apply(function() {
                        scope.onPressEnter();
                    });
                }
            });
        }
    };
});
