(function() {
    'use strict';

    angular
        .module('accounting.system')
        .constant('NODE_API_BASE_URL', 'http://localhost:8080')
        .constant('NODE_SOCKET_BASE_URL', 'http://localhost:8081')
        .constant('ACCOUNTING_SYSTEMS', getAccountingSystems())
        .constant('ACCOUNTING_SYSTEM_SERVICES', getAccountingSystemServices());

    function getAccountingSystems(){
        return {
            QUICKBOOKS: 'Quickbooks',
            DATAENGINE: 'DataEngine'
        }
    }

    function getAccountingSystemServices(){
        return {
            INVOICE: {
                name: 'Invoice',
                methods: ['create', 'send', 'pdf', 'mailPreferences']
            }
        }
    }
})();
