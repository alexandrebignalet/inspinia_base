(function() {
    'use strict';

    angular
        .module('dataToolApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {

        $stateProvider
            .state('router-main', {
                parent: 'components',
                data: {
                    pageTitle: 'Router',
                    authorities: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN']
                },
                views: {
                    'content@': {
                        template: '<tab-generator tabs="$resolve.tabs"></tab-generator>'
                    }
                },
                resolve: {
                    tabs: function(){
                        return [
                            {
                                icon: 'fa fa-sitemap',
                                titleTranslate: 'router.routers',
                                state: 'router',
                                view: 'router'
                            },
                            {
                                icon: 'fa fa-sitemap',
                                titleTranslate: 'router.pricingTiers',
                                state: 'pricing-tier',
                                view: 'pricing-tier'
                            },
                            {
                                icon: 'fa fa-sitemap',
                                titleTranslate: 'router.pricingPlans',
                                state: 'pricing-plan',
                                view: 'router.pricing-plan'
                            }
                        ];
                    }
                }
            });
    }
})();
