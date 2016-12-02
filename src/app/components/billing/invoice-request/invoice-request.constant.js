(function() {
    'use strict';

    angular
        .module('dataToolApp')
        .constant('BILLING_STATES', getBillingStates());

    function getBillingStates(){
        return {
            NOT_CHARGED: 'notCharged',
            TO_CHARGED: 'toCharged',
            CHARGED: 'charged',
            PAID: 'paid'
        };
    }
})();
