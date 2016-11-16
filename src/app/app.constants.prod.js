(function() {
    'use strict';

    angular
        .module('dataToolApp')
        .constant('VERSION', 'v1.0')
        .constant('NODE_BASE_URL', 'http://datatool.web:3000')
        .constant('API_BASE_URL', 'http://datatool.web/api')
        .constant('TYPE_BILLING', 'Billing')
        .constant('ACCOUNTING_SYSTEM', 'Quickbooks');
})();
