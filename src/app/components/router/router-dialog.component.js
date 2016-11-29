(function () {
    'use strict';

    var routerDialog = {
        templateUrl: 'app/components/router/router-dialog.html',
        controller: RouterDialogController,
        controllerAs: 'vm',
        bindings: {
            modalInstance: '<',
            resolve: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('routerDialog', routerDialog);

    RouterDialogController.$inject = ['Router'];

    /* @ngInject */
    function RouterDialogController(Router) {
        var vm = this;

        vm.clear = clear;
        vm.onSaveRouter = onSaveRouter;

        vm.$onInit = function () {
            vm.router = vm.resolve.router;
        };

        function clear() {
            vm.modalInstance.dismiss();
        }

        function onSaveRouter($event) {
            var router = $event.router;

            vm.isSaving = true;

            if( router.id ){
                Router.update(router)
                    .then(onSaveSuccess)
                    .catch(onSaveError);
            } else {
                Router.save(router)
                    .then(onSaveSuccess)
                    .catch(onSaveError);
            }

            function onSaveSuccess(response) {
                vm.isSaving = false;
                vm.modalInstance.close();
            }

            function onSaveError(error) {
                vm.isSaving = false;
            }
        }
    }

})();
