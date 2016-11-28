/**
 * Created by Axel on 21/11/2016.
 */
(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .factory('PlatformAccessDialogService', PlatformAccessDialogService);

    PlatformAccessDialogService.$inject = ['$state', '$uibModal'];

    /* @ngInject */
    function PlatformAccessDialogService($state, $uibModal) {

        var service = {
            openDialogModal: openDialogModal,
            openDeleteModal: openDeleteModal
        };

        return service;

        ////////////////

        function openDialogModal(platformAccess, announcers) {

            $uibModal.open({
                component: 'platformAccessDialog',
                backdrop: 'true',
                size: 'lg',
                resolve: {
                    platformAccess: function(){
                        return platformAccess;
                    },
                    announcers: function(){
                        return announcers;
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

        function openDeleteModal(platformAccessId) {

            $uibModal.open({
                component: 'platformAccessDelete',
                backdrop: 'static',
                size: 'lg',
                resolve: {
                    platformAccessId: function () {
                        return platformAccessId;
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

