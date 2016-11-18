(function() {
    'use strict';

    angular
        .module('dataToolApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
            .state('user', {
                parent: 'components',
                url: '/users',
                data: {
                    pageTitle: 'User Management',
                    authorities: ['ROLE_ADMIN']
                },
                views: {
                    'content@': {
                        templateUrl: 'app/components/user/users.html',
                        controller: 'UserController',
                        controllerAs: 'vm',
                        resolve: {

                        }
                    }
                }
            });
    }
})();
