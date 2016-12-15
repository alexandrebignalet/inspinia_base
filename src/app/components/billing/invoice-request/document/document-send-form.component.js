(function () {
    'use strict';

    var documentSendForm = {
        templateUrl: 'app/components/billing/invoice-request/document/document-send-form.html',
        controller: DocumentSendFormController,
        controllerAs: 'vm',
        bindings: {
            documentId: '<',
            preferences: '<',
            mail: '<',
            isSending: '<',
            pdf: '<',
            onSendDocument: '&'
        }
    };

    angular
        .module('dataToolApp')
        .component('documentSendForm', documentSendForm);

    DocumentSendFormController.$inject = [];

    /* @ngInject */
    function DocumentSendFormController() {
        var vm = this;

        vm.onSubmit = onSubmit;

        ////////////////


        function onSubmit() {
            vm.onSendDocument({
                $event: {
                    documentId: vm.documentId,
                    preferences: vm.preferences,
                    mail: vm.mail
                }
            })
        }
    }

})();



