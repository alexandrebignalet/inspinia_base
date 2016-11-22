/**
 * Created by Axel on 21/11/2016.
 */
(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .factory('platformAccessDialogService', platformAccessDialogService);

    platformAccessDialogService.$inject = ['$state','$uibModal', 'Announcer'];

    /* @ngInject */
    function platformAccessDialogService($state,$uibModal,Announcer) {

        var service = {
            openDialogModal: openDialogModal,
            openDeleteModal: openDeleteModal
        };

        return service;

        ////////////////

        function openDialogModal(announcerId,platformId) {

            if( announcerId == '' ) {
                var announcers = Announcer.getAll();
            }

            $uibModal.open({
                component: 'platformAccessDialog',
                backdrop: 'true',
                size: 'lg',
                resolve: {
                    platformAccess: initPlatformAccess(announcerId, platformId),
                    announcers: announcers
                }
            }).result.then(function () {
                $state.go('^', null, {reload: true})
            }, function () {
                $state.go('^')
            });


        }

        function initPlatformAccess(announcerId,platformId) {
            var platformAccess = {
                announcer: announcerId,
                url: null,
                username: null,
                password: null,
                description: null
            };

            if( platformId != '' ) {
                platformAccess = Announcer.getPlatformAccess(platformId);
            }
            return platformAccess;
        }

        function openDeleteModal(platformAccessId) {

            $uibModal.open({
                component: 'platformAccessDelete',
                backdrop: 'static',
                size: 'lg',
                resolve: {
                    platformAccessId: {id: platformAccessId}
                }
            }).result.then(function(){
                console.log('foo');
                $state.go('^',null, {reload: true})
            },function() {
                $state.go('^')
            })

        }
    }

})();

