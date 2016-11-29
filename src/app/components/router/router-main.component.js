(function () {
    'use strict';

    var routerMain = {
        templateUrl: 'app/components/router/router-main.html',
        controller: RouterMainController,
        controllerAs: 'vm',
        bindings: {
            routers: '<',
            pricingTiers: '<',
            pricingPlans: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('routerMain', routerMain);

    RouterMainController.$inject = [];

    /* @ngInject */
    function RouterMainController() {}
})();



