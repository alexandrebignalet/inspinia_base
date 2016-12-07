(function () {
    'use strict';

    angular
        .module('accounting.system')
        .factory('AccountingSystem', AccountingSystem);

    AccountingSystem.$inject = ['ACCOUNTING_SYSTEM_SERVICES', '$injector'];

    /* @ngInject */
    function AccountingSystem(ACCOUNTING_SYSTEM_SERVICES, $injector) {
        var that = this;

        that.accountingSystemName = null;
        that.services = {};

        var service = {
            init: init,
            getServices: getServices
        };

        return service;

        ////////////////

        function init(accountingSystemName){
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

