(function () {
    'use strict';

    var campaignsSections = {
        templateUrl: 'app/components/database/show/widgets/campaigns-sections.html',
        controller: CampaignsSectionsController,
        controllerAs: 'vm',
        bindings: {
            ladderTag: '<',
            ladderCampaign: '<',
            incomesByBm: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('campaignsSections', campaignsSections);

    CampaignsSectionsController.$inject = ['Database'];

    /* @ngInject */
    function CampaignsSectionsController() {
        var vm = this;

        vm.ecpmMax = 0.5;
        vm.ecpmMin = 0.2;

        vm.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
        vm.data = [300, 500, 100];

    }

})();
