(function() {
    'use strict';

    angular
        .module('dataToolApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('home', {
            parent: 'components',
            url: '/home',
            data: {
                pageTitle: 'Vue d\'ensemble',
                authorities: ['ROLE_ADMIN', 'ROLE_USER','ROLE_SUPER_ADMIN']
            },
            views: {
                'content@': {
                    template: '<home></home>',
                }
            },
            resolve: {
                mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('home');
                    return $translate.refresh();
                }],
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'ui.sortable'
                    ]);
                }

            }
        });
    }
})();
