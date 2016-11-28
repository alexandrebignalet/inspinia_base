(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .factory('contactDialogService', contactDialogService);

    contactDialogService.$inject = ['$state', '$uibModal'];

    /* @ngInject */
    function contactDialogService($state, $uibModal) {

        var service = {
            openDialogModal: openDialogModal,
            openDeleteModal: openDeleteModal
        };

        return service;

        ////////////////

        function openDialogModal(contact, companies) {

            $uibModal.open({
                component: 'contactDialog',
                backdrop: 'true',
                size: 'lg',
                resolve: {
                    contact: function() { return contact},
                    companies: function(){ return companies}
                }
            }).result.then(function () {
                $state.go('^', null, {reload: true})
            }, function () {
                $state.go('^')
            });
        }

        function openDeleteModal(contactId) {

            $uibModal.open({
                component: 'contactDelete',
                backdrop: 'static',
                size: 'lg',
                resolve: {
                    contactId: {id: contactId}
                }
            }).result.then(function(){
                $state.go('^',null, {reload: true})
            },function() {
                $state.go('^')
            })
        }
    }

})();

