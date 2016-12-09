(function () {
    'use strict';

    var lastDataUpdated = {
        templateUrl: 'app/components/database/show/widgets/last-data-updated.html',
        controller: LastDataUpdatedController,
        controllerAs: 'vm',
        bindings: {

        }
    };

    angular
        .module('dataToolApp')
        .component('lastDataUpdated', lastDataUpdated);

    LastDataUpdatedController.$inject = [];

    /* @ngInject */
    function LastDataUpdatedController() {
        var vm = this;



    }

})();
