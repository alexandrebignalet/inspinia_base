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
                        template: '<users users="$resolve.users"></users>',
                        resolve: {
                            users: ['User', '$q', 'ToastrService', function(User, $q, ToastrService){
                                return User.resource().get().$promise
                                    .then(getUsersThen)
                                    .catch(getUsersCatch);

                                function getUsersThen(data){
                                    return data.users;
                                }
                                function getUsersCatch(error){
                                    ToastrService.error(error, 'Impossible to retrieve users.');
                                    return $q.reject(error);
                                }
                            }],
                            mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                                $translatePartialLoader.addPart('user');
                                return $translate.refresh();
                            }]
                        }
                    }
                }
            });
    }
})();
