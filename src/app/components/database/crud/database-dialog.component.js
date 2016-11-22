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

    DatabaseDialogController.$inject = ['$timeout', 'Database', 'ToastrService', '$q', 'COUNTRIES'];

    /* @ngInject */
    function DatabaseDialogController($timeout, Database, ToastrService, $q, COUNTRIES) {
        var vm = this;

        vm.clear = clear;
        vm.onSubmit = onSubmit;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        vm.$onInit = function () {
            vm.countries = COUNTRIES;
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
            delete vm.database.expertsender_cpm;

            vm.isSaving = true;

            if (angular.isDefined(vm.database.id) && vm.database.id !== null) {
                // TODO use ES2015 and destructuration to avoid this mess
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



