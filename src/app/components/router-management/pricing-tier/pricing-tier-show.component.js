(function () {
    'use strict';

    var pricingTierShow = {
        templateUrl: 'app/components/router-management/pricing-tier/pricing-tier-show.html',
        bindings: {
            pricingTier: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('pricingTierShow', pricingTierShow);
})();



