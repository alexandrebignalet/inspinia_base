(function () {
    'use strict';

    angular
        .module('accounting.system', [
            'btford.socket-io',
            'ngResource'
        ]).run(run);

    run.$inject = ['AccountingSystem', 'ACCOUNTING_SYSTEMS', 'AuthQuickbooks'];

    function run (AccountingSystem, ACCOUNTING_SYSTEMS, AuthQuickbooks) {
        AccountingSystem.init(ACCOUNTING_SYSTEMS.QUICKBOOKS);
        AuthQuickbooks.setAuthInfo('qyprdZBVlz5PeYSzvBMt0ZK4E27pbQ', 'eSdp2o7thAlbiQCaf0IEYD8lqNUW1pqpZKPbosaC')
    }

})();
