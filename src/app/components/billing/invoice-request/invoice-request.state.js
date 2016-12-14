(function() {
    'use strict';

    angular
        .module('dataToolApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {

        $stateProvider
            .state('invoice-request', {
                parent: 'billing',
                url: '/invoice-request',
                data: {
                    pageTitle: 'Invoice request',
                    authorities: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN']
                },
                views: {
                    'content@': {
                        template: '<invoice-request announcers="$resolve.announcers"></invoice-request>'
                    }
                },
                resolve: {
                    announcers: ['Announcer', function(Announcer){
                        return Announcer.getAll([
                            'announcers_all',
                            'companies_all',
                            'contacts_summary',
                            'addresses_summary'
                        ])
                    }],
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['datatables', 'datepicker']);
                    },
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                        $translatePartialLoader.addPart('billing');
                        $translatePartialLoader.addPart('company');
                        $translatePartialLoader.addPart('contact');
                        return $translate.refresh();
                    }]
                }
            });
    }
})();
