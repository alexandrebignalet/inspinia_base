(function () {
    'use strict';

    angular
        .module('accounting.system')
        .factory('AccountingSystem', AccountingSystem);

    AccountingSystem.$inject = ['ACCOUNTING_SYSTEM_SERVICES', 'ACCOUNTING_SYSTEMS', '$injector', 'AuthQuickbooks'];

    /* @ngInject */
    function AccountingSystem(ACCOUNTING_SYSTEM_SERVICES, ACCOUNTING_SYSTEMS, $injector, AuthQuickbooks) {
        var that = this;

        that.accountingSystemName = null;
        that.services = {};

        var service = {
            getName: getName,
            set: set,
            getServices: getServices
        };

        return service;

        ////////////////

        function getName () {
            return that.accountingSystemName
        }

        function set(accountingSystemName){
            if (accountingSystemName === ACCOUNTING_SYSTEMS["DATAENGINE"]){
                AuthQuickbooks.setAvailable(false);
            }

            //TODO later from here you would receive the agency accounting system from the api
            that.accountingSystemName = accountingSystemName

            if (!that.accountingSystemName) { throw new Error('You should define the accounting system') }

            angular.forEach(ACCOUNTING_SYSTEM_SERVICES, function(service){

                angular.forEach(service.methods, function(method){

                    that.services[service.name] = $injector.get( service.name + that.accountingSystemName );

                    if ( !can(service, method)){
                        throw new Error( service.name + that.accountingSystemName + ' should implement method ' + method )
                    }

                })

            });
        }

        function getServices(){
            return that.services;
        }

        function can(service, methodName) {
            return ((typeof that.services[service.name][methodName]) == "function")
        }
    }
})();

