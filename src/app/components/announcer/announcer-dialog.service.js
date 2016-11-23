(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .factory('announcerDialogService', announcerDialogService);

    announcerDialogService.$inject = ['$state','$uibModal'];

    /* @ngInject */
    function announcerDialogService($state,$uibModal) {

        var service = {
            openDialogModal: openDialogModal,
            openDeleteModal: openDeleteModal
        };

        return service;

        ////////////////

        function openDialogModal(announcer,companies,contacts) {

            $uibModal.open({
                component: 'announcerDialog',
                backdrop: 'true',
                size: 'lg',
                resolve: {
                    announcer: function() { return announcer},
                    companies: function() { return companies},
                    contacts: function() { return contacts}
                }
            }).result.then(function () {
                $state.go('^', null, {reload: true})
            }, function () {
                $state.go('^')
            });
        }

        function openDeleteModal(announcerId) {

            $uibModal.open({
                component: 'announcerDelete',
                backdrop: 'static',
                size: 'lg',
                resolve: {
                    announcerId: {id: announcerId}
                }
            }).result.then(function(){
                $state.go('^',null, {reload: true})
            },function() {
                $state.go('^')
            })
        }
    }

})();

