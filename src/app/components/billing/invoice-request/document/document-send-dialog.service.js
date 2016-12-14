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

        function openDialogModal(id, type) {
            var accountingService = AccountingSystem.getServices()[type];

            $uibModal.open({
                component: 'documentSendDialog',
                backdrop: 'true',
                size: 'lg',
                resolve: {
                    document: function(){
                        return document
                    },
                    type: function(){
                        return type
                    },
                    pdf: function(){
                        return accountingService.pdf(id);
                    },
                    preferences: function(){
                        return accountingService.preferences();
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

