(function () {
    'use strict';

    var documentSendForm = {
        templateUrl: 'app/components/billing/invoice-request/document/document-send-form.html',
        controller: DocumentSendFormController,
        controllerAs: 'vm',
        bindings: {
            document: '<',
            isSaving: '<',
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
                    document: vm.document
                }
            })
        }
    }

})();



