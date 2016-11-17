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
                authorities: ['ROLE_ADMIN', 'ROLE_USER']
            },
            views: {
                'content@': {
                    template: '<home></home>'
                }
            }
        });
    }
})();
