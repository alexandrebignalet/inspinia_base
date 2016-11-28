(function() {
    'use strict';

    angular
        .module('dataToolApp')
        .constant('PAYMENT_PERIOD_OPTIONS', getOptions());

    function getOptions(){

        return [
            {
                name: "On invoice received",
                value: 0
            },
            {
                name: "NET 10",
                value: 10
            },
            {
                name: "NET 15",
                value: 15
            },
            {
                name: "NET 30",
                value: 30
            },
            {
                name: "NET 60",
                value: 60
            }
        ]
    }
})();
