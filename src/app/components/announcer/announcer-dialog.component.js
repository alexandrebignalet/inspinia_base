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

    AnnouncerDialogController.$inject = ['Announcer','Address','Company'];

    /* @ngInject */
    function AnnouncerDialogController(Announcer,Address,Company) {
        var vm              = this;

        vm.clear            = clear;
        vm.onSaveAnnouncer       = onSaveAnnouncer;
        vm.onChangeCreateCompany = onChangeCreateCompany;
        vm.onSaveAddress         = onSaveAddress;
        vm.onSaveCompany         = onSaveCompany;

        vm.$onInit = function () {
            vm.announcer    = vm.resolve.announcer;
            vm.company      = vm.resolve.company;
            vm.companies    = vm.resolve.companies;
            vm.contacts     = vm.resolve.contacts;
            vm.databases    = vm.resolve.databases;
        };

        function onChangeCreateCompany($event) {
            vm.createCompany = $event.createCompany;
            if( vm.createCompany && vm.company.id ) {
                vm.announcer.company = vm.company;
            }
        }

        function onSaveCompany($event) {

            vm.isSaving = true;

            if( $event.company.id ) {
                Company.update($event.company)
                    .then(onSuccess)
                    .catch(onError);
            } else {
                Company.save($event.company)
                    .then(onSuccess)
                    .catch(onError);
            }

            function onError() {
                vm.isSaving = false
            }

            function onSuccess(company) {
                delete company.$promise;
                delete company.$resolved;

                vm.company = company;
                vm.announcer.company = company;
                vm.isSaving = false
            }
        }

        function onSaveAddress($event) {
            if (!$event.address) return;

            vm.isSaving = true;

            if( $event.address.id != null ) {
                Address.update($event.address)
                    .then(onSuccess)
                    .catch(onError);
            } else {
                Address.save($event.address)
                    .then(onSuccess)
                    .catch(onError);
            }

            function onSuccess(address) {
                delete address.$promise;
                delete address.$resolved;

                vm.isSaving = false;
                vm.company.address = address;
            }

            function onError() {
                vm.isSaving = false;
            }
        }

        function clear() {
            vm.modalInstance.dismiss();
        }

        function onSaveAnnouncer($event) {

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
