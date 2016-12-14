(function() {
    'use strict';

    angular
        .module('dataToolApp')
        .constant('VERSION', 'v1.0')
        .constant('NODE_BASE_URL', 'http://datatool.dev:3000')
        .constant('API_BASE_URL', 'http://datatool.dev')
        .constant('TYPE_BILLING', 'Billing')
        .constant('TYPE_COMMERCIAL', 'Commercial')
        .constant('ACCOUNTING_SYSTEM', 'Quickbooks')
        .constant('moment', moment)
        .constant('toastr', toastr);
})();
