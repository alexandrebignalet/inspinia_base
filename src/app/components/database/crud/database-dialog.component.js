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
            database : '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('databaseDialog', databaseDialog);

    DatabaseDialogController.$inject = ['$uibModalInstance'];

    /* @ngInject */
    function DatabaseDialogController($uibModalInstance) {
        var vm = this;

        vm.clear = clear;
        vm.save = save;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            // vm.isSaving = true;
            // if (vm.database.id !== null) {
            //     Field.resource().patch(
            //         {"id": vm.database.id},
            //         {name: vm.database.name, description: vm.database.description},
            //         onSaveSuccess,
            //         onSaveError);
            // } else {
            //     Field.resource().save({name: vm.database.name, description: vm.database.description}, onSaveSuccess, onSaveError);
            // }
        }

        // function onSaveSuccess () {
        //     $scope.$emit('sapebApp:databaseUpdate', vm.database);
        //     $uibModalInstance.close(vm.database);
        //     vm.isSaving = false;
        // }
        //
        // function onSaveError () {
        //     vm.isSaving = false;
        // }
    }

})();



