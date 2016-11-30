(function () {
    'use strict';

    var routerDeleteDialog = {
        templateUrl: 'app/components/router-management/router/router-dialog-delete.html',
        controller: RouterDeleteDialogController,
        controllerAs: 'vm',
        bindings: {
            modalInstance: '<',
            resolve: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('routerDeleteDialog', routerDeleteDialog);

    RouterDeleteDialogController.$inject = ['Router'];

    /* @ngInject */
    function RouterDeleteDialogController(Router) {
        var vm = this;

        vm.isDeleting = false;

        vm.clear = clear;

        vm.onDelete = onDelete;

        vm.$onInit = function () {
            vm.routerId = vm.resolve.routerId;
        };

        function clear() {
            vm.modalInstance.dismiss('cancel');
        }

        function onDelete($event) {
            if (!$event.routerId) return;

            vm.isDeleting = true;

            Router.delete($event.routerId)
                .then(onSuccess)
                .catch(onError);

            function onSuccess(router) {
                vm.isDeleting = false;
                vm.modalInstance.close(router);
            }

            function onError() {
                vm.isDeleting = false;
            }
        }
    }

})();
