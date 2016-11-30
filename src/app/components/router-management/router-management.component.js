(function(){
    'use strict';

    var routerManagement = {
        templateUrl: 'app/components/router-management/router-management.html',
        controller: RouterManagementController,
        controllerAs: 'vm'
    };

    angular
        .module('dataToolApp')
        .component('routerManagement', routerManagement);

    RouterManagementController.$inject = ['$rootScope', '$state'];

    function RouterManagementController($rootScope, $state) {
        var vm = this;

        vm.activeTab = $state.current.data.activeTab || 0;

        vm.$onInit = function (){
            vm.tabs = [
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
                    view: 'pricing-plan'
                }
            ];
        };

        var stateChanged = $rootScope.$on('$stateChangeSuccess', function(event, toState){
            vm.activeTab = toState.data.activeTab;
        });

        var transition = $rootScope.$watch('transition', function(n){
            vm.loading = n;
        });

        $rootScope.$on('$destroy', function(){
            if(angular.isDefined(transition) && transition !== null){
                transition();
            }
            if(angular.isDefined(stateChanged) && stateChanged !== null){
                stateChanged();
            }
        });

    }
})();
