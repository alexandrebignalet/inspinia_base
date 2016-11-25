(function() {
    'use strict';

    angular
        .module('dataToolApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {

        $stateProvider
            .state('address', {
                parent: 'components',
                url: '/addresses',
                data: {
                    pageTitle: 'Address',
                    authorities: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN']
                },
                views: {
                    'content@': {
                        template: '<address-main addresses="$resolve.addresses"></address-main>'
                    }
                },
                resolve: {
                    addresses: [
                        'Address', function(Address) {
                            return Address.getAll();
                        }
                    ],
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                        $translatePartialLoader.addPart('address');
                        return $translate.refresh();
                    }],
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['datatables']);
                    }
                }
            })
            .state('address.create', {
                parent: 'address',
                url: '/create',
                data: {
                    pageTitle: 'Create an address',
                    authorities: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN']
                },
                onEnter: ['AddressDialogService', 'Address',
                    function(AddressDialogService, Address) {
                        var address = Address.init();
                        AddressDialogService.openDialogModal(address);
                    }]
            })
            .state('address.edit', {
                parent: 'address',
                url: '/{id}/edit',
                data: {
                    pageTitle: 'Edit an address',
                    authorities: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN']
                },
                resolve: {
                    address: ['Address', '$stateParams', function(Address, $stateParams){
                        return Address.get($stateParams.id)
                    }]
                },
                onEnter: ['AddressDialogService', 'address',
                    function(AddressDialogService, address) {
                        AddressDialogService.openDialogModal(address);
                    }]
            })
            .state('address.delete', {
                parent: 'address',
                url: '/{id}/delete',
                data: {
                    pageTitle: 'Edit an address',
                    authorities: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN']
                },
                onEnter: ['AddressDialogService', '$stateParams',
                    function(AddressDialogService, $stateParams) {
                        AddressDialogService.openDeleteModal($stateParams.id);
                    }]
            });
    }
})();
