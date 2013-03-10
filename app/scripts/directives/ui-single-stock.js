'use strict';

stockpocApp.directive('uiSingleStock', function () {
    return {
        template: "<div class='stockPanel'>\
            <div class='th-parent'>\
        Symbol: <input type='text' type-head-input class='span3' ng-model='selectedSymbol'>\
        <ul class='typeahead dropdown-menu' ng-class='{active: showAutoComplete()}'>\
            <li ng-repeat='option in typeHeaderOptions'>\
                <a ng-click='typeHeadOptionClick(option)'>SYMBOL:{{option.symbol}} --- NAME: {{option.name}}</a>\
            </li>\
        </ul>\
    </div>\
    <div ng-show='quote' class='quote'>\
        <div><span class='name'>{{quote.Name}}</span></div>\
        <p><span class='time'>Last update: {{lastUpdateTime}}</span></p>\
    <div>\
        <span class='price'>{{quote.LastTradePriceOnly}}</span><span class='last-change'>{{quote.Change}}</span>\
    </div>\
    </div>\
    <div ng-show='quoteError'>\
        <p>{{quoteError}}</p>\
    </div>\
    </div>",
        restrict: 'A',
        controller: 'SingleStockCtrl',
        link: function postLink(scope, element, attrs) {
            element.find('[type-head-input]').bind('keypress', function (e) {
                var code = (e.keyCode ? e.keyCode : e.which);
                if (code == 13) {
                    scope.$apply(function () {
                        scope.onPressEnter();
                    });
                }
            });
        }
    };
});
