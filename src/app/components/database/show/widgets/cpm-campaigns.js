(function () {
    'use strict';

    var cpmCampaigns = {
        templateUrl: 'app/components/database/show/widgets/cpm-campaigns.html',
        controller: CpmCampaignsController,
        controllerAs: 'vm',
        bindings: {

        }
    };

    angular
        .module('dataToolApp')
        .component('cpmCampaigns', cpmCampaigns);

    CpmCampaignsController.$inject = [];

    /* @ngInject */
    function CpmCampaignsController() {
        var vm = this;
    }

})();
