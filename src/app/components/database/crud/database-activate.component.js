(function () {
    'use strict';

    var databaseActivate = {
        template: '<div>'+
        '<button type="button"' +
        'ng-disabled="vm.isSaving" ng-click="vm.update()"' +
        ' ng-class="{' +
        '\'btn btn-primary btn-circle\': vm.database.active,' +
        '\'btn btn-danger btn-circle btn-outline\': !vm.database.active' +
        '}">' +
        '<span class="fa fa-power-off"></span>'+
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
            if (!vm.authorize) return;

            vm.database.active = !vm.database.active;

            vm.onActivate({
                $event: {
                    database: vm.database
                }
            });
        }
    }

})();



