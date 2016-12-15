(function () {
    'use strict';

    var documentSendDialog = {
        templateUrl: 'app/components/billing/invoice-request/document/document-send-dialog.html',
        controller: DocumentSendController,
        controllerAs: 'vm',
        bindings: {
            modalInstance: '<',
            resolve: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('documentSendDialog', documentSendDialog);

    DocumentSendController.$inject = ['Company', 'ToastrService'];

    /* @ngInject */
    function DocumentSendController(Company, ToastrService) {
        var vm = this;

        vm.$onInit = onInit;
        vm.onSendDocument = onSendDocument;
        vm.clear = clear;

        vm.isSending = false;

        ////////////////

        function onInit(){
            vm.documentId = vm.resolve.documentId;
            vm.type = vm.resolve.type;
            vm.pdf = vm.resolve.pdf;
            vm.preferences = vm.resolve.preferences;
            vm.billingContact = Company.getBillingContact(vm.resolve.announcer.company);
            vm.sendDocument = vm.resolve.sendDocument;
        }

        function clear() {
            vm.modalInstance.dismiss();
        }

        function onSendDocument($event) {
            if ( !$event.mail || !$event.preferences || !$event.documentId ) { return }

            vm.isSending = true;

            vm.sendDocument($event.documentId, $event.mail, $event.preferences)
                .then(onSendSuccess)
                .catch(onSendError);

            function onSendSuccess(){
                ToastrService.success("envoyé à " + $event.mail, "Envoi réussi");
                vm.isSending = false;
                vm.modalInstance.close();
            }
            function onSendError(){
                vm.isSending = false;
                vm.modalInstance.close();
            }
        }
    }
})();



