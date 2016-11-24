(function () {
    'use strict';

    var announcerForm = {
        templateUrl: 'app/components/announcer/announcer-form.html',
        controller: AnnouncerFormController,
        controllerAs: 'vm',
        bindings: {
            entity: '<',
            companies: '<',
            contacts: '<',
            onSaveEntity: '&'
        }
    };

    angular
        .module('dataToolApp')
        .component('announcerForm', announcerForm);

    AnnouncerFormController.$inject = ['COUNTRIES'];

    /* @ngInject */
    function AnnouncerFormController(COUNTRIES) {
        var vm = this;
        vm.isSaving = false;
        vm.save = save;

        vm.$onInit = function() {
            vm.announcer =  vm.entity;
            vm.announcer.useCompanyAddress = vm.announcer.address != '';
            vm.countries = COUNTRIES;
        };

        // TODO : USE EVENT

        function save() {
            console.log(vm.announcer);
            vm.onSaveEntity({announcer: vm.announcer});
        }
    }

})();
