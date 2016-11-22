(function () {
    'use strict';

    var databaseActivate = {
        template: '<div ng-if="!vm.authorize">'+
                    '<span class="fa fa-power-off" style="color:red;" ng-if="!vm.database.active"></span>'+
                    '<span class="fa fa-power-off" style="color:green;" ng-if="vm.database.active"></span>'+
                '</div>' +
                '<div ng-if="vm.authorize" ng-click="vm.update()">'+
                    '<a href ng-if="!vm.database.active">'+
                        '<span class="fa fa-power-off" style="color:red;"></span>'+
                    '</a>'+
                    '<a href ng-if="vm.database.active">'+
                        '<span class="fa fa-power-off" style="color:green;"></span>'+
                    '</a>'+
                '</div>',
        controller: DatabaseActivateController,
        controllerAs: 'vm',
        bindings: {
            database: '<',
            authorize: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('databaseActivate', databaseActivate);

    DatabaseActivateController.$inject = ['Database', 'ToastrService', '$q'];

    /* @ngInject */
    function DatabaseActivateController(Database, ToastrService, $q) {
        var vm = this;

        vm.update = update;

        function update(){
            vm.database.active = !vm.database.active;

            delete vm.database.routers;
            delete vm.database.companies;
            delete vm.database.lots;
            delete vm.database.expertsender_cpm;
            var id = vm.database.id;
            delete vm.database.id;

            Database.patch({'id': id}, vm.database, onPatchSuccess, onPatchError);

            function onPatchSuccess(data){
                return data;
            }

            function onPatchError(error){
                ToastrService.error(error, 'Impossible to activate database.');
                return $q.reject(error);
            }
        }
    }

})();



