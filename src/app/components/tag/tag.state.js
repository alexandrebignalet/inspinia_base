(function() {
    'use strict';

    angular
        .module('dataToolApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {

        $stateProvider
            .state('tag', {
                parent: 'components',
                url: '/tags',
                data: {
                    pageTitle: 'Tags',
                    authorities: ['ROLE_ADMIN','ROLE_USER', 'ROLE_SUPER_ADMIN']
                },
                views: {
                    'content@': {
                        template: '<tags tags="$resolve.tags"></tags>'
                    }
                },
                resolve: {
                    tags: [
                        'Tag', function(Tag) {
                            return Tag.getAll();
                        }
                    ],
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                        $translatePartialLoader.addPart('tag');
                        return $translate.refresh();
                    }],
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['datatables']);
                    }
                }
            });
    }
})();
