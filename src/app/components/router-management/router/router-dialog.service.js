(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .factory('RouterDialogService', RouterDialogService);

    RouterDialogService.$inject = ['$state', '$uibModal'];

    /* @ngInject */
    function RouterDialogService($state, $uibModal) {

        var service = {
            openDialogModal: openDialogModal,
            openDeleteModal: openDeleteModal
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

        function openDeleteModal(routerId) {

            $uibModal.open({
                component: 'routerDeleteDialog',
                backdrop: 'true',
                size: 'lg',
                resolve: {
                    routerId: function(){
                        return routerId
                    }
                }
            }).result.then(function(){
                $state.go('^',null, {reload: true})
            },function() {
                $state.go('^')
            })
        }
    }

})();

