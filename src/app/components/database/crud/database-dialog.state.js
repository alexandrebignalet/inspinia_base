(function() {
    'use strict';

    /**
     * TODO create a autocomplete function backend with a LIKE clause foreach entity
     */

<<<<<<< HEAD

=======
>>>>>>> functions create & edit created, not functionnal due to api.. bugs fixed
    angular
        .module('dataToolApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {

        $stateProvider
            .state('database.create', {
<<<<<<< HEAD
                parent: 'database',
                url: '/create',
                data: {
                    pageTitle: 'Create a database',
                    authorities: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN']
                },
                onEnter: ['$state', '$uibModal',
                    function($state, $uibModal) {
                        $uibModal.open({
                            component: 'databaseDialog',
                            backdrop: 'static',
                            size: 'lg',
                            resolve: {
                                database: {
                                    name: null,
                                    country: null,
                                    type: null,
                                    reinerouge_id: null,
                                    expertsender_apiurl: null,
                                    expertsender_apikey: null,
                                    mailxpertise_token: null,
                                    mailxpertise_apikey: null,
                                    mailxpertise_list_ids: null,
                                    mailxpertise_domain: null,
                                    age: false,
                                    sexe: false,
                                    zipcode: false,
                                    name_ext: false,
                                    firstname: false,
                                    active: false
                                },
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['iCheckButtons']);
                                }
                            }
                        }).result.then(function() {
                            $state.go('database');
                        }, function() {
                            $state.go('database');
                        });
                    }]
            })
            .state('database.edit', {
                parent: 'database',
                url: '/{id}/edit',
                data: {
                    pageTitle: 'Edit a database',
                    authorities: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN']
                },
                onEnter: ['$stateParams', '$state', '$uibModal', 'ToastrService', '$q',
                    function($stateParams, $state, $uibModal, ToastrService, $q) {
                        $uibModal.open({
                            component: 'databaseDialog',
                            backdrop: 'static',
                            size: 'lg',
                            resolve: {
                                countries: ['CountriesProvider', function(CountriesProvider){
                                    return CountriesProvider.get();
                                }],
                                database: ['Database', function(Database){
                                    return Database.get({
                                        'id': $stateParams.id
                                    }).$promise
                                        .then(getDatabaseThen)
                                        .catch(getDatabaseCatch);

                                    function getDatabaseThen(data){
                                        return data;
                                    }
                                    function getDatabaseCatch(error){
                                        ToastrService
                                            .error(error, 'Impossible to retrieve the database ' + $stateParams.id);
                                        return $q.reject(error);
                                    }
                                }],
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['iCheckButtons']);
                                }
                            }
                        }).result.then(function() {
                            $state.go('database');
                        }, function() {
                            $state.go('database');
                        });
                    }]
            });
    }
})();
