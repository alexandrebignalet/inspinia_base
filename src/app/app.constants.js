(function() {
    'use strict';

    angular
        .module('dataToolApp')
        .constant('VERSION', 'v1.0')
        .constant('NODE_BASE_URL', 'http://datatool.dev:3000')
        .constant('API_BASE_URL', 'http://datatool.dev/api')
        .constant('TOKEN', 'b7fe3bee26c14bb42c0b6b9fbff38fae08982b6a')
        .constant('TYPE_BILLING', 'Billing')
        .constant('ACCOUNTING_SYSTEM', 'Datatool');
})();
