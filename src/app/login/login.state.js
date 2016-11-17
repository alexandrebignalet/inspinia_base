(function() {
    'use strict';

    angular
        .module('dataToolApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {

        $stateProvider
            .state('login', {
                parent: 'app',
                url: '/login',
                data: {
                    pageTitle: 'Login'
                },
                views: {
                    'content@': {
                        template: '<login></login>'
                    }
                }
            });
    }
})();
