(function() {
    'use strict';

    angular
        .module('dataToolApp')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('app', {
                abstract: true,
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('global');
                    }]
                }
            });

        $urlRouterProvider.otherwise('/home');
    }
})();
