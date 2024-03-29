(function() {
    'use strict';

    angular
        .module('dataToolApp')
        .constant('BILLING_STATES', getBillingStates())
        .constant('BILLING_DOCUMENTS_TYPES', getBillingDocumentTypes());

    function getBillingStates(){
        return {
            NOT_CHARGED: 'notCharged',
            TO_CHARGED: 'toCharged',
            CHARGED: 'charged',
            PAID: 'paid'
        };
    }

    function getBillingDocumentTypes(){
        return {
            INVOICE: 'Invoice',
            WAITINGLIST: 'WaitingList',
            ESTIMATE: 'Estimate'
        }
    }

})();
