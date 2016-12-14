(function () {
    'use strict';

    var lastCampaigns = {
        templateUrl: 'app/components/database/show/widgets/last-campaigns.html',
        controller: LastCampaignsController,
        controllerAs: 'vm',
        bindings: {
        }
    };

    angular
        .module('dataToolApp')
        .component('lastCampaigns', lastCampaigns);

    LastCampaignsController.$inject = [];

    /* @ngInject */
    function LastCampaignsController() {
        var vm = this;


    }

})();
