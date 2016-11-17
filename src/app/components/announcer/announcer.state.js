/**
 * Created by Axel on 17/11/2016.
 */
(function() {
    'use strict';

    angular
        .module('dataToolApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {

        $stateProvider
            .state('announcer', {
                parent: 'components',
                url: '/announcer',
                data: {
                    pageTitle: 'Announcer'
                },
                views: {
                    'content@': {
                        templateUrl: 'app/components/announcer/announcers.html',
                        controller: 'AnnouncerController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {
                                serie: true,
                                files: ['bower_components/angular-datatables/dist/angular-datatables.js']
                            },
                            {
                                serie: true,
                                files: ['bower_components/angular-datatables/dist/plugins/bootstrap/angular-datatables.bootstrap.min.js']
                            },
                            {
                                serie: true,
                                files: ['bower_components/angular-datatables/dist/plugins/buttons/angular-datatables.buttons.js']
                            }
                        ]);
                    }
                }
            });
    }
})();
