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
                    authorize: ['Auth',
                        function (Auth) {
                            return Auth.authorize(true);
                        }
                    ],
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('global');
                    }]
                }
            });

        $urlRouterProvider.otherwise('/login');
    }
})();
