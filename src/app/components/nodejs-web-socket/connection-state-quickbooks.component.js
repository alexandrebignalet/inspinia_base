(function () {
    'use strict';

    var connectionStateQuickbooks = {
        templateUrl: 'app/components/nodejs-web-socket/connection-state-quickbooks.html',
        controller: ConnectionStateQuickbooksController,
        controllerAs: 'vm'
    };

    angular
        .module('dataToolApp')
        .component('connectionStateQuickbooks', connectionStateQuickbooks);

    ConnectionStateQuickbooksController.$inject = ['$scope', 'AuthQuickbooks', 'NodeSocket', '$timeout',
                                                   'ACCOUNTING_SYSTEMS', 'AccountingSystem'];

    function ConnectionStateQuickbooksController($scope, AuthQuickbooks, NodeSocket, $timeout,
                                                 ACCOUNTING_SYSTEMS, AccountingSystem) {
        var vm = this;

        vm.$onInit = onInit;
        vm.reload = reload;
        vm.switchAccounting = switchAccounting;

        function onInit () {
            NodeSocket.connect();
            vm.connected = false;
            vm.display = true;
        }

        function reload () {
            NodeSocket.connect()
        }

        function switchAccounting () {
            AccountingSystem.set(ACCOUNTING_SYSTEMS.DATAENGINE);
            vm.display = false
        }

        $scope.$watch(function(){
            return NodeSocket.isConnected();
        }, function(value){
            vm.connected = value;
            if (!vm.connected){
                vm.display = true
            }
        });

        $scope.$watch(function(){
            return AuthQuickbooks.isAvailable();
        }, function(value){
            vm.available = value;

            if (vm.available && vm.display){
                $timeout(function(){
                    vm.display = false
                }, 500)
            }
        });
    }
})();
