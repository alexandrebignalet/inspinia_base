(function () {
    'use strict';

    var connectionAccounting = {
        template: '<div ng-click="vm.connect()">' +
        '<span ng-if="vm.connected">Node ON</span>'+
        '<span ng-if="!vm.connected">Node OFF</span>'+
        '<span ng-if="vm.available">Quickbooks ON</span>'+
        '<span ng-if="!vm.available">Quickbooks OFF</span>',
        controller: ConnectionAccountingController,
        controllerAs: 'vm'
    };

    angular
        .module('accounting.system')
        .component('connectionAccounting', connectionAccounting);

    ConnectionAccountingController.$inject = ['$scope', 'AuthQuickbooks', 'NodeSocket'];

    function ConnectionAccountingController($scope, AuthQuickbooks, NodeSocket) {
        var vm = this;

        vm.$onInit = onInit;
        vm.connect = connect;

        function connect(){
            NodeSocket.connect();
        }

        function onInit () {
            vm.connected = false;
        }

        $scope.$watch(function(){
            return NodeSocket.isConnected();
        }, function(value){
            vm.connected = value;
        });

        $scope.$watch(function(){
            return AuthQuickbooks.isAvailable();
        }, function(value){
            vm.available = value;
        });
    }
})();
