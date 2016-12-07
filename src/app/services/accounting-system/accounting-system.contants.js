(function() {
    'use strict';

    angular
        .module('accounting.system')
        .constant('NODE_API_BASE_URL', 'http://localhost:8080')
        .constant('NODE_SOCKET_BASE_URL', 'http://localhost:8081')
        .constant('ACCOUNTING_SYSTEMS', getAccountingSystems());

    function getAccountingSystems(){
        return {
            QUICKBOOKS: 'quickbooks'
        }
    }
})();
