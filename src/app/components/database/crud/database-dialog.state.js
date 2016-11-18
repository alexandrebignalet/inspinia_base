(function() {
    'use strict';

    angular
        .module('dataToolApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {

        $stateProvider
            .state('database.create', {
                parent: 'database',
                url: '/databases/create',
                data: {
                    pageTitle: 'Create a database',
                    authorities: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_SUPER_ADMIN']
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        template: '<database-dialog database="$resolve.database"></database-dialog>',
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
                                plans: null,
                                age: null,
                                sexe: null,
                                zipcode: null,
                                nameExt: null,
                                firstname: null,
                                active: null
                            },
                            countries: ['Company', function(Company){
                                return Company.get().$promise;
                            }]
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
