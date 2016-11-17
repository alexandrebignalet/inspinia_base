(function() {
    'use strict';

    angular
        .module('dataToolApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {

        $stateProvider
            .state('accessdenied', {
                url: '/accessdenied',
                data: {
                    pageTitle: '404'
                },
                views: {
                    'content@': {
                        templateUrl: 'app/layouts/errors/404.html'
                    }
                }
            });
    }
})();
