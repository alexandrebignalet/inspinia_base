(function () {
    'use strict';

    var databaseDialog = {
        templateUrl: 'app/components/database/crud/database-dialog.html',
        controller: DatabaseDialogController,
        controllerAs: 'vm',
        bindings: {
            resolve: '<',
            modalInstance: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('databaseDialog', databaseDialog);

    DatabaseDialogController.$inject = ['Database'];

    /* @ngInject */
    function DatabaseDialogController(Database) {
        var vm = this;

        vm.clear = clear;
        vm.onSave = onSave;
        vm.isSaving = false;


        vm.$onInit = function () {
            vm.database = vm.resolve.database;
            delete vm.resolve;
        };

        function clear () {
            vm.modalInstance.dismiss('cancel');
        }

        function onSave($event){
            if (!$event.database) return;

            vm.isSaving = true;

            if ($event.database.id !== null) {
                Database.patch($event.database)
                    .then(onSaveSuccess)
                    .catch(onSaveError);
            } else {
                Database.save($event.database)
                    .then(onSaveSuccess)
                    .catch(onSaveError);
            }

            function onSaveSuccess(database){
                vm.isSaving = false;
                vm.modalInstance.close(database);
            }
            function onSaveError(){
                vm.isSaving = false;
            }
        }
    }

})();



