(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .factory('CompanyDialogService', CompanyDialogService);

    CompanyDialogService.$inject = ['$state', '$uibModal'];

    /* @ngInject */
    function CompanyDialogService($state, $uibModal) {

        var service = {
            openDialogModal: openDialogModal,
            openDeleteModal: openDeleteModal
        };

        return service;

        ////////////////

        function openDialogModal(company, databases) {

            $uibModal.open({
                component: 'companyDialog',
                backdrop: 'true',
                size: 'lg',
                resolve: {
                    company: function(){
                        return company
                    },
                    databases: function(){
                        return databases
                    }
                }
            })
                .result
                .then(function () {
                        $state.go('^', null, {reload: true})
                    }, function () {
                        $state.go('^')
                    }
                );
        }

        function openDeleteModal(companyId) {

            $uibModal.open({
                component: 'companyDelete',
                backdrop: 'static',
                size: 'lg',
                resolve: {
                    companyId: function () {
                        return companyId;
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

