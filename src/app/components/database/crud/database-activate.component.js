(function () {
    'use strict';

    var databaseActivate = {
        template: '<div ng-if="!vm.authorize">'+
                    '<span class="fa fa-power-off" style="color:red;" ng-if="!vm.database.active"></span>'+
                    '<span class="fa fa-power-off" style="color:green;" ng-if="vm.database.active"></span>'+
                '</div>' +
                '<div ng-if="vm.authorize">'+
                    '<button type="button" ng-if="!vm.database.active" ng-disabled="vm.isSaving" ng-click="vm.update()">'+
                        '<span class="fa fa-power-off" style="color:red;"></span>'+
                    '</button>'+
                    '<button type="button" ng-if="vm.database.active" ng-disabled="vm.isSaving" ng-click="vm.update()">'+
                        '<span class="fa fa-power-off" style="color:green;"></span>'+
                    '</button>'+
                '</div>',
        controller: DatabaseActivateController,
        controllerAs: 'vm',
        bindings: {
            database: '<',
            authorize: '<',
            onActivate: '&',
            isSaving: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('databaseActivate', databaseActivate);

    DatabaseActivateController.$inject = [];

    /* @ngInject */
    function DatabaseActivateController() {
        var vm = this;
        vm.update = update;

        vm.$onChanges = function(changes) {
            if (changes.database) {
                vm.database = Object.assign({}, vm.database);
            }
        };

        function update(){
            vm.database.active = !vm.database.active;

            vm.onActivate({
                $event: {
                    database: vm.database
                }
            });
        }
    }

})();



