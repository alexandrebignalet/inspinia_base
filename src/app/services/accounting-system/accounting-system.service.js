(function () {
    'use strict';

    angular
        .module('accounting.system')
        .factory('AccountingSystem', AccountingSystem);

    AccountingSystem.$inject = [];

    /* @ngInject */
    function AccountingSystem() {

        var _accountingSystem = null;

        var service = {
            get: get,
            set: set
        };

        return service;

        ////////////////

        function get() {
            return _accountingSystem
        }

        function set(accountingSystemName){
            //TODO later from here you would receive the agency accounting system from the api
            _accountingSystem = accountingSystemName
        }
    }

})();

