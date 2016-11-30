(function () {
    'use strict';

    var pricingPlanShow = {
        templateUrl: 'app/components/router-management/pricing-plan/pricing-plan-show.html',
        bindings: {
            pricingPlan: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('pricingPlanShow', pricingPlanShow);
})();



