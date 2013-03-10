'use strict';

describe('Controller: SingleStockCtrl', function () {

    // load the controller's module
    beforeEach(module('stockpocApp'));

    var SingleStockCtrl,
        scope,
        mockSymbolOptions = JSON.parse('[{"symbol": "LTE.PA", "name": "Valtech SA", "exch": "PAR", "type": "S", "exchDisp": "Paris", "typeDisp": "Equity"},\
            {"symbol": "VLTHF", "name": "VALTECH LA DEFENSE", "exch": "PNK", "type": "S", "exchDisp": "OTC Markets", "typeDisp": "Equity"},\
            {"symbol": "VT5.SG", "name": "VALTECH", "exch": "STU", "type": "S", "exchDisp": "Stuttgart", "typeDisp": "Equity"},\
            {"symbol": "VT5.F", "name": "VALTECH", "exch": "FRA", "type": "S", "exchDisp": "Frankfurt", "typeDisp": "Equity"}]');


    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, _$httpBackend_) {
        scope = {};
        scope.$watch = function (){
        } ;
        _$httpBackend_.expectJSONP(/.*/).respond({}); //ignore setup mock http service
        SingleStockCtrl = $controller('SingleStockCtrl', {
            $scope: scope
        });

    }));

    it('should display autocomplete popup once user begin input symbol into typehead', function () {
        scope.selectedSymbol = 'h';
        scope.typeHeaderOptions = mockSymbolOptions;
        expect(scope.showAutoComplete()).toBe(true);
    });

    it('should close autocomplete popup once user click option in typehead autocomplete', function (){
        scope.selectedSymbol = 'h';
        scope.typeHeaderOptions = mockSymbolOptions;
        expect(scope.showAutoComplete()).toBe(true);

        scope.typeHeadOptionClick({symbol: 'VLTHF', name: 'VALTECH LA DEFENSE'});
        expect(scope.showAutoComplete()).toBe(false);
    });

    it('selected option should match clicked option from autocomplete', function() {
        var option = {symbol: 'VLTHF', name: 'VALTECH LA DEFENSE'};
        scope.typeHeadOptionClick(option);
        expect(scope.selectedSymbol).toBe(option.symbol);
    });

    it('should close autocomplete once user press enter key from typehead', function (){
        scope.selectedSymbol = 'h';
        scope.typeHeaderOptions = mockSymbolOptions;
        expect(scope.showAutoComplete()).toBe(true);
        scope.onPressEnter();
        expect(scope.showAutoComplete()).toBe(false);
    });


});
