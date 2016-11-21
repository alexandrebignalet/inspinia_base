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
            openDialogModal: openDialogModal
        };

        return service;

        ////////////////

        function openDialogModal(announcerId,platformId) {

            var platformAccess = {
                    announcer: announcerId,
                    url: null,
                    username: null,
                    password: null,
                    description: null
                };

            if( platformId != '' ) {
                platformAccess = Announcer.getPlatformAccess(platformId);
                console.log(platformAccess);
            }

            if( announcerId == '' && platformAccess.announcer == '') {
                var announcers = Announcer.getAll();
            }



            $uibModal.open({
                component: 'platformAccessDialog',
                backdrop: 'static',
                size: 'lg',
                resolve: {
                    platformAccess: platformAccess,
                    announcers: announcers
                }
            }).result.then(function(){
                $state.go('^')
            },function() {
                $state.go('^')
            })
        }
    }

})();

