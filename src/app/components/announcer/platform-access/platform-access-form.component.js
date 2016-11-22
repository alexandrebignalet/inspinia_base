(function () {
    'use strict';

    var platformAccessForm = {
        templateUrl: 'app/components/announcer/platform-access/platform-access-form.html',
        controller: PlatformAccessFormController,
        controllerAs: 'vm',
        bindings: {
            entity: '<',
            announcers: '<',
            onSaveEntity: '&'
        }
    };

    angular
        .module('dataToolApp')
        .component('platformAccessForm', platformAccessForm);

    PlatformAccessFormController.$inject = [];

    /* @ngInject */
    function PlatformAccessFormController() {
        var vm = this;
        vm.isSaving = false;
        vm.selectAnnouncer = true;
        vm.save = save;

        vm.$onInit = function() {
            vm.platformAccess =  vm.entity;
            vm.selectAnnouncer  = vm.platformAccess.announcer == '';
        };

        function save() {
            vm.onSaveEntity({platformAccess: vm.platformAccess});
        }
    }

})();
