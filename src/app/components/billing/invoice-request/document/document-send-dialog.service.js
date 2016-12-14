(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .factory('DocumentSendDialog', DocumentSendDialog);

    DocumentSendDialog.$inject = ['$state', '$uibModal', 'AccountingSystem'];

    /* @ngInject */
    function DocumentSendDialog($state, $uibModal, AccountingSystem) {

        var service = {
            openDialogModal: openDialogModal
        };

        return service;

        ////////////////

        function openDialogModal(documentId, type, announcer) {
            var accountingService = AccountingSystem.getServices()[type];

            $uibModal.open({
                component: 'documentSendDialog',
                backdrop: 'true',
                windowClass: 'send-document-modal-window',
                resolve: {
                    documentId: function(){
                        return documentId
                    },
                    type: function(){
                        return type
                    },
                    announcer: function(){
                        return announcer
                    },
                    pdf: function(){
                        return accountingService.pdf(documentId);
                    },
                    preferences: function(){
                        return accountingService.mailPreferences();
                    },
                    sendDocument: function(){
                        return accountingService.send
                    },
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['pdfjs']);
                    }
                }
            })
                .result
                .then(function () {
                        $state.go('invoice-request')
                    }, function () {
                        $state.go('invoice-request')
                    }
                );
        }
    }

})();

