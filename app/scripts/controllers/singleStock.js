'use strict';

stockpocApp.controller('SingleStockCtrl', ['$scope', 'symbolService', 'stockService',
    function ($scope, symbolService, stockService) {
        $scope.selectedSymbol = "";
        var preventCycleCall = false;
        var symbolLookup = function (query) {
            symbolService.list(query, function (data) {
                $scope.typeHeaderOptions = data.ResultSet.Result;
            })
        };

        var fetchStockBySymbol = function (symbol) {
            stockService.get(symbol, function (data) {
                if(angular.isObject(data.error)){
                    $scope.quoteError = data.error.description;
                    $scope.quote = null;
                }else{
                    $scope.quoteError = null;
                    var d = Date.parse(data.query.created);
                    $scope.quote = data.query.results.quote;
                    $scope.lastUpdateTime = new Date(d).toLocaleString();
                }
            })
        };

        $scope.$watch('selectedSymbol', function(query){
            if(query.length > 0 && !preventCycleCall) {
                symbolLookup(query);
            }
            preventCycleCall = false;
        });
        $scope.showAutoComplete = function () {
            return $scope.selectedSymbol.length > 0 && $scope.typeHeaderOptions.length > 0;
        };

        $scope.typeHeaderOptions = [];

        $scope.typeHeadOptionClick = function (option) {
            preventCycleCall = true;
            $scope.selectedSymbol = option.symbol;
            $scope.typeHeaderOptions = [];
            fetchStockBySymbol($scope.selectedSymbol);
        };

        $scope.onPressEnter = function () {
            preventCycleCall = true;
            $scope.selectedSymbol = $scope.selectedSymbol.toUpperCase();
            $scope.typeHeaderOptions = [];
            fetchStockBySymbol($scope.selectedSymbol);
        };

        setInterval(function () {
            if(angular.isString($scope.selectedSymbol) && $scope.selectedSymbol.length > 0) {
                fetchStockBySymbol($scope.selectedSymbol);
            }
        }, 15000);


    }]);
