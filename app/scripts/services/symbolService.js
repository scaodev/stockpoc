'use strict';
var YAHOO = {};
stockpocApp.factory('symbolService', ['$http', function ($http) {
    var listCallback,
        query = 'http://d.yimg.com/autoc.finance.yahoo.com/autoc?query=:query&callback=YAHOO.Finance.SymbolSuggest.ssCallback';
    YAHOO.Finance = {};
    YAHOO.Finance.SymbolSuggest = {};
    YAHOO.Finance.SymbolSuggest.ssCallback = function (data) {
        listCallback(data);
    };


    // Public API here
    return {
        list: function (prefix, onSuccess) {
            listCallback = onSuccess;
            $http.jsonp(query.replace(":query", prefix));
        }
    };
}]);
