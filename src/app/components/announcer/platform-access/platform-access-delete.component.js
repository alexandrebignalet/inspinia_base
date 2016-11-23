(function () {
    'use strict';

    var platformAccessDelete = {
        templateUrl: 'app/components/announcer/platform-access/platform-access-delete.html',
        controller: PlatformAccessDeleteController,
        controllerAs: 'vm',
        bindings: {
            modalInstance: '<',
            resolve: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('platformAccessDelete', platformAccessDelete);

    PlatformAccessDeleteController.$inject = ['PlatformAccess'];

    /* @ngInject */
    function PlatformAccessDeleteController(PlatformAccess) {
        var vm = this;

        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        vm.$onInit = function() {
            vm.platformAccessId = vm.resolve.platformAccessId;
        };

        function clear() {
            vm.modalInstance.dismiss();
        }

        function confirmDelete() {
            PlatformAccess.delete(vm.platformAccessId)
                .then(onSuccess)
                .catch(onError);

            function onSuccess() {
                vm.modalInstance.close();
            }

            function onError() {
                vm.modalInstance.dismiss();
            }

        }
    }


})();



