(function () {
    'use strict';

    var platformAccessForm = {
        templateUrl: 'app/components/announcer/platform-access/platform-access-form.html',
        controller: PlatformAccessFormController,
        controllerAs: 'vm',
        bindings: {
            platformAccess: '<',
            announcers: '<',
            onSavePlatformAccess: '&'
        }
    };

    angular
        .module('dataToolApp')
        .component('platformAccessForm', platformAccessForm);

    PlatformAccessFormController.$inject = [];

    /* @ngInject */
    function PlatformAccessFormController() {
        var vm = this;

        vm.fromAnnouncer = vm.platformAccess.announcer !== null;

        vm.onSubmit = onSubmit;

        function onSubmit() {
            vm.onSavePlatformAccess({
                $event: {
                    platformAccess: vm.platformAccess
                }
            });
        }
    }

})();
