'use strict';

stockpocApp.controller('SingleStockCtrl', function($scope) {
    $scope.selectedSymbol = "";
    $scope.showAutoComplete = function () {
        return $scope.selectedSymbol.length > 0 && $scope.typeHeaderOptions.length > 0;
    };

    $scope.typeHeaderOptions = [];

    $scope.typeHeadOptionClick = function (option){
        $scope.selectedSymbol = option.symbol;
        $scope.typeHeaderOptions = [];
    }

    $scope.onTypeheadKeyup = function () {
        $scope.typeHeaderOptions = [];
    }
});
