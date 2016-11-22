(function() {
    'use strict';

    angular
        .module('dataToolApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {

        $stateProvider
            .state('contact', {
                parent: 'components',
                url: '/contact',
                data: {
                    pageTitle: 'Contact'
                },
                views: {
                    'content@': {
                        template: '<announcer></announcer>'
                    }
                },
                resolve: {
                    data: [
                        'Announcer', function(Announcer) {
                            return {}
                        }
                    ],
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                        $translatePartialLoader.addPart('contact');
                        return $translate.refresh();
                    }]
                }
            });
    }
})();
