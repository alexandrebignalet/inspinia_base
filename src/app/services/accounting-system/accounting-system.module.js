(function () {
    'use strict';

    angular
        .module('accounting.system', [
            'btford.socket-io',
            'ngResource'
        ]).run(run);

    run.$inject = ['AccountingSystem', 'ACCOUNTING_SYSTEMS'];

    function run (AccountingSystem, ACCOUNTING_SYSTEMS) {
        AccountingSystem.init(ACCOUNTING_SYSTEMS.QUICKBOOKS);
    }

})();
