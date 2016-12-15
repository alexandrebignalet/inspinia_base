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

        function openDialogModal(documentId, type, announcer, dataService) {

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
                        return dataService.pdf(documentId);
                    },
                    preferences: function(){
                        return dataService.mailPreferences();
                    },
                    sendDocument: function(){
                        return dataService.send
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

