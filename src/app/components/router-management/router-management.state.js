(function() {
    'use strict';

    angular
        .module('dataToolApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {

        $stateProvider
            .state('router-main', {
                parent: 'components',
                data: {
                    pageTitle: 'Router',
                    authorities: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN']
                },
                views: {
                    'content@': {
                        template: '<router-management></router-management>'
                    }
                },
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['datatables']);
                    },
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                        $translatePartialLoader.addPart('router');
                        $translatePartialLoader.addPart('pricing-plan');
                        $translatePartialLoader.addPart('pricing-tier');
                        return $translate.refresh();
                    }]
                }
            });
    }
})();
