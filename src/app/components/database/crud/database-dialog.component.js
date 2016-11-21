/**
 * Created by Axel on 18/11/2016.
 */
/**
 * Created by Axel on 17/11/2016.
 */
(function () {
    'use strict';

    var databaseDialog = {
        templateUrl: 'app/components/database/crud/database-dialog.html',
        controller: DatabaseDialogController,
        controllerAs: 'vm',
        bindings: {
            modalInstance: '<',
            resolve: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('databaseDialog', databaseDialog);

    DatabaseDialogController.$inject = ['$timeout', 'Database', 'ToastrService', '$q'];

    /* @ngInject */
    function DatabaseDialogController($timeout, Database, ToastrService, $q) {
        var vm = this;

        vm.clear = clear;
        vm.onSubmit = onSubmit;
console.log(vm.resolve)
        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        vm.$onInit = function () {
            vm.database = vm.resolve.database;
            delete vm.resolve;
        };

        function clear () {
            vm.modalInstance.dismiss('cancel');
        }

        function onSubmit(){
            if (!vm.database) return;
            delete vm.database.routers;
            delete vm.database.companies;
            delete vm.database.lots;

            vm.isSaving = true;

            if (vm.database.id !== null) {
                var id = vm.database.id;
                delete vm.database.id;
                Database.patch(
                    {"id": id},
                    vm.database,
                    onSaveSuccess,
                    onSaveError);
            } else {
                Database.save(vm.database, onSaveSuccess, onSaveError);
            }

            function onSaveSuccess(database){
                vm.isSaving = false;
                vm.modalInstance.close(vm.database);
                console.log(database);
            }
            function onSaveError(error){
                vm.isSaving = false;
                ToastrService.error(error, 'Fail to save Database.');
                return $q.reject(error);
            }
        }
    }

})();



