'use strict';

stockpocApp.controller('SingleStockCtrl', ['$scope', 'symbolService',
    function ($scope, symbolService) {
        $scope.selectedSymbol = "";
        var preventCycleCall = false;
        var symbolLookup = function (query) {
            symbolService.list(query, function (data) {
                $scope.typeHeaderOptions = data.ResultSet.Result;
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
        }

        $scope.onTypeheadKeyup = function () {
            preventCycleCall = true;
            $scope.selectedSymbol = $scope.selectedSymbol.toUpperCase();
            $scope.typeHeaderOptions = [];
        }
    }]);
