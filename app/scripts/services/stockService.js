'use strict';

var cbfunc;
stockpocApp.factory('stockService', ['$http', function ($http) {
    // Service logic
    // ...
    var qTemplate = 'http://query.yahooapis.com/v1/public/yql?q=select * from yahoo.finance.quotes where symbol in (":query")&format=json&env=http://datatables.org/alltables.env&callback=cbfunc'

    // Public API here
    return {
        get: function (query, onSuccess) {
            cbfunc = function (data){
                onSuccess(data);
            };
            var q = encodeURI(qTemplate.replace(':query', query));
            $http.jsonp(q);
        }
    };
}]);
