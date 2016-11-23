(function () {
    'use strict';

    var contactDelete = {
        templateUrl: 'app/components/contact/contact-delete.html',
        controller: ContactDeleteController,
        controllerAs: 'vm',
        bindings: {
            modalInstance: '<',
            resolve: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('contactDelete', contactDelete);

    ContactDeleteController.$inject = ['Contact'];

    /* @ngInject */
    function ContactDeleteController(Contact) {
        var vm = this;

        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        vm.$onInit = function() {
            vm.contactId = vm.resolve.contactId.id;
            console.log(vm.contactId);
        };

        function clear() {
            vm.modalInstance.dismiss();
        }

        function confirmDelete() {
            Contact.delete(vm.contactId)
                .then(onSuccess)
                .catch(onError)
            ;

            function onSuccess() {
                vm.modalInstance.close();
            }

            function onError() {
                vm.modalInstance.dismiss();
            }

        }
    }


})();



