/**
 * Created by Axel on 18/11/2016.
 */
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
            .state('platform-access', {
                parent: 'announcer',
                url: '/platform-access',
                data: {
                    pageTitle: 'Platform access'
                },
                views: {
                    'content@': {
                        templateUrl: 'app/components/announcer/platform-acces/platform-acces.html',
                        controller: 'PlatformAccessController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                        $translatePartialLoader.addPart('announcer');
                        return $translate.refresh();
                    }],
                    /*loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {
                                serie: true,
                                files: ['bower_components/datatables.net-buttons-bs/js/buttons.bootstrap.js','bower_components/datatables.net-buttons-bs/css/buttons.bootstrap.min.css']
                            },
                            {
                                serie: true,
                                files: ['bower_components/datatables.net-bs/js/dataTables.bootstrap.min.js','bower_components/datatables.net-bs/css/dataTables.bootstrap.min.css']
                            },
                            {
                                serie: true,
                                files: ['bower_components/angular-datatables/dist/angular-datatables.min.js']
                            },
                            {
                                serie: true,
                                files: ['bower_components/angular-datatables/dist/plugins/bootstrap/angular-datatables.bootstrap.js','bower_components/angular-datatables/dist/plugins/bootstrap/datatables.bootstrap.min.css']
                            },

                            {
                                serie: true,
                                files: ['bower_components/angular-datatables/dist/plugins/buttons/angular-datatables.buttons.min.js']
                            },

                        ]);
                    }*/
                }
            });
    }
})();
