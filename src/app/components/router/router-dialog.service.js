(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .factory('routerDialogService', routerDialogService);

    routerDialogService.$inject = ['$state', '$uibModal'];

    /* @ngInject */
    function routerDialogService($state, $uibModal) {

        var service = {
            openDialogModal: openDialogModal
        };

        return service;

        ////////////////

        function openDialogModal(router) {

            $uibModal.open({
                component: 'routerDialog',
                backdrop: 'true',
                size: 'lg',
                resolve: {
                    router: function() { return router},
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['iCheckButtons']);
                    }
                }
            }).result.then(function () {
                $state.go('^', null, {reload: true})
            }, function () {
                $state.go('^')
            });
        }

        /*function openDeleteModal(contactId) {

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
        }*/
    }

})();

