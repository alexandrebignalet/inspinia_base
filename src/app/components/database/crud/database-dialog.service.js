(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .factory('DatabaseDialogService', DatabaseDialogService);

    DatabaseDialogService.$inject = ['$state','$uibModal'];

    /* @ngInject */
    function DatabaseDialogService($state, $uibModal) {

        var service = {
            openDialogModal: openDialogModal,
            openDeleteModal: openDeleteModal
        };

        return service;

        ////////////////

        function openDialogModal(database) {

            $uibModal.open({
                component: 'databaseDialog',
                backdrop: true,
                size: 'lg',
                resolve: {
                    database: database,
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
    }

})();
