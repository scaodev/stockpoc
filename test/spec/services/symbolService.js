'use strict';

describe('Service: symbolService', function () {

    // load the service's module
    beforeEach(module('stockpocApp'));

    // instantiate service
    var symbolService;
    beforeEach(inject(function (_symbolService_, _$httpBackend_) {
        symbolService = _symbolService_;
        _$httpBackend_.expectJSONP(/^http:\/\/d\.yimg\.com\/autoc.finance.yahoo.com\/autoc\?query=Valtech&callback.*/).respond('\
        YAHOO.Finance.SymbolSuggest.ssCallback({"ResultSet": {"Query": "valtech", "Result": [\
            {"symbol": "LTE.PA", "name": "Valtech SA", "exch": "PAR", "type": "S", "exchDisp": "Paris", "typeDisp": "Equity"},\
            {"symbol": "VLTHF", "name": "VALTECH LA DEFENSE", "exch": "PNK", "type": "S", "exchDisp": "OTC Markets", "typeDisp": "Equity"},\
            {"symbol": "VT5.SG", "name": "VALTECH", "exch": "STU", "type": "S", "exchDisp": "Stuttgart", "typeDisp": "Equity"},\
            {"symbol": "VT5.F", "name": "VALTECH", "exch": "FRA", "type": "S", "exchDisp": "Frankfurt", "typeDisp": "Equity"}\
        ]}})\
        ')
    }));

    it('should strip YAHOO callback method header', function () {
        symbolService.list('Valtech', function(data) {
            expect(angular.isString(data)).toBe(false);
        });
    });

    it('should has Query match request string', function() {
        symbolService.list('Valtech', function(data) {
            expect(data.Query).toBe('Valtech');
        });
    });

    it('should has 4 symbols in return result', function (){
        symbolService.list('Valtech', function (data){
            expect(data.Result.length).toBe(4);
        });
    });
});
