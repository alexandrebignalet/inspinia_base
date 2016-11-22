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
                        template: '<contact contacts="$resolve.data"></contact>'
                    }
                },
                resolve: {
                    data: [
                        'Contact', function(Contact) {
                            return Contact.getAll(['contacts_all'])
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
