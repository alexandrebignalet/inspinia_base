(function() {
    'use strict';

    /**
     * TODO create a autocomplete function backend with a LIKE clause foreach entity
     */

    angular
        .module('dataToolApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {

        $stateProvider
            .state('database.create', {
            parent: 'database',
            url: '/create',
            data: {
                pageTitle: 'Create a database',
                authorities: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN']
            },
            onEnter: ['$state', '$uibModal', 'ToastrService', '$q',
                function($state, $uibModal, ToastrService, $q) {
                    $uibModal.open({
                        component: 'databaseDialog',
                        backdrop: 'static',
                        size: 'lg',
                        resolve: {
                            countries: ['CountriesProvider', function(CountriesProvider){
                                return CountriesProvider.get();
                            }],
                            database: {
                                id: null,
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
                                plans: null,
                                age: null,
                                sexe: null,
                                zipcode: null,
                                nameExt: null,
                                firstname: null,
                                active: null
                            }
                        }
                    }).result.then(function() {
                        $state.go('database', null, { reload: 'database' });
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
                                    return $ocLazyLoad.load([
                                        {
                                            files: ['bower_components/iCheck/skins//square/_all.css']
                                        }
                                    ]);
                                }
                            }
                        }).result.then(function() {
                            $state.go('database', null, { reload: 'database' });
                        }, function() {
                            $state.go('database');
                        });
                    }]
            });
    }
})();
