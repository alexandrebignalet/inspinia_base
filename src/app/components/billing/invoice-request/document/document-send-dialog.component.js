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

    DocumentSendController.$inject = [];

    /* @ngInject */
    function DocumentSendController() {
        var vm = this;

        vm.$onInit = onInit;
        vm.onSendDocument = onSendDocument;
        vm.clear = clear;

        vm.isSaving = false;

        ////////////////

        function onInit(){
            vm.document = vm.resolve.document;
            vm.type = vm.resolve.type;
            vm.pdf = vm.resolve.pdf;
            vm.preferences = vm.resolve.preferences;
            vm.sendDocument = vm.resolve.sendDocument;
        }

        function clear() {
            vm.modalInstance.dismiss();
        }

        function onSendDocument($event) {
            console.log($event)
        }
    }

})();



