(function () {
    'use strict';

    var announcerDialog = {
        templateUrl: 'app/components/announcer/announcer-dialog.html',
        controller: AnnouncerDialogController,
        controllerAs: 'vm',
        bindings: {
            modalInstance: '<',
            resolve: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('announcerDialog', announcerDialog);

    AnnouncerDialogController.$inject = ['Announcer'];

    /* @ngInject */
    function AnnouncerDialogController(Announcer) {
        var vm              = this;
        vm.clear            = clear;
        vm.saveEntity       = saveEntity;

        vm.$onInit = function () {
            console.log(vm.resolve);
            vm.announcer    = vm.resolve.announcer;
            vm.companies    = vm.resolve.companies;
            vm.contacts     = vm.resolve.contacts;
        };

        function clear() {
            vm.modalInstance.dismiss();
        }

        function saveEntity($event) {

            vm.isSaving = true;

            if( $event.announcer.id ) {
                Announcer.update($event.announcer)
                    .then(success)
                    .catch(error);
            } else {
                Announcer.save($event.announcer)
                    .then(success)
                    .catch(error);
            }

            function error() {
                vm.isSaving = false;
            }

            function success() {
                vm.isSaving = false;
                vm.modalInstance.close('success');
            }


        }
    }

})();
