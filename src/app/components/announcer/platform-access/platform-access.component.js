(function () {
    'use strict';

    var platformAccess = {
        templateUrl: 'app/components/announcer/platform-access/platform-access.html',
        controller: PlatformAccessController,
        controllerAs: 'vm',
        bindings: {
            announcers : '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('platformAccess', platformAccess);

    PlatformAccessController.$inject = ['DTOptionsBuilder','DTColumnBuilder'];

    /* @ngInject */
    function PlatformAccessController(DTOptionsBuilder,DTColumnBuilder) {
        var vm = this;
    }

})();



