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

        function saveEntity(announcer) {

            vm.isSaving = true;

            if( announcer.id ) {
                Announcer.update(announcer)
                    .then(success)
                    .catch(error);
            } else {
                Announcer.save(announcer)
                    .then(success)
                    .catch(error);
            }

            function error() {

            }

            function success() {
                vm.modalInstance.close('success');
            }


        }
    }

})();
