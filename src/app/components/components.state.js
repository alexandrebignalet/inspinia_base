(function() {
    'use strict';

    angular
        .module('dataToolApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
            .state('components', {
                parent: 'app',
                abstract: true,
                data:{
                    authorities: []
                },
                views: {
                    'sidebar@': {
                        template: '<side-navigation></side-navigation>'
                    },
                    'topNavbar@': {
                        template: '<top-navbar></top-navbar>'
                    },
                    'topTitleBar@': {
                        template: '<top-title-bar></top-title-bar>'
                    }
                },
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {
                                serie: true,
                                files: ['bower_components/metisMenu/dist/metisMenu.js', 'bower_components/metisMenu/dist/metisMenu.css']
                            }
                        ]);
                    }
                }
            });
    }
})();
