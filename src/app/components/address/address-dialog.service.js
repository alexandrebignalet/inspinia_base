(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .factory('AddressDialogService', AddressDialogService);

    AddressDialogService.$inject = ['$state','$uibModal'];

    /* @ngInject */
    function AddressDialogService($state, $uibModal) {

        var service = {
            openDialogModal: openDialogModal,
            openDeleteModal: openDeleteModal
        };

        return service;

        ////////////////

        function openDialogModal(address) {

            $uibModal.open({
                component: 'addressDialog',
                backdrop: 'true',
                size: 'lg',
                resolve: {
                    address: function(){
                        return address;
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

        function openDeleteModal(addressId) {

            $uibModal.open({
                component: 'addressDeleteDialog',
                backdrop: 'static',
                size: 'md',
                resolve: {
                    addressId: function () {
                        return addressId;
                    }
                }
            })
                .result
                .then(function(){
                    $state.go('^',null, {reload: true})
                },function() {
                    $state.go('^')
                })

        }
    }

})();

