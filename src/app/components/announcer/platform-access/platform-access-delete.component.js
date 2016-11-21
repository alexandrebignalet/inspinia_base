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

    PlatformAccessDeleteController.$inject = ['Announcer'];

    /* @ngInject */
    function PlatformAccessDeleteController(Announcer) {
        var vm = this;

        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        vm.$onInit = function() {
            vm.platformAccessId = vm.resolve.platformAccessId.id;
            console.log(vm.platformAccessId);
        };

        function clear() {
            vm.modalInstance.dismiss();
        }

        function confirmDelete() {
            Announcer.deletePlatformAccess(vm.platformAccessId);
        }
    }


})();



