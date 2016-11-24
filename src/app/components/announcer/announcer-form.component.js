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
            vm.countries = COUNTRIES;
            console.log(vm.countries);
        };

        // TODO : USE EVENT

        function save() {
            console.log(vm.announcer);
            vm.onSaveEntity({announcer: vm.announcer});
        }
    }

})();
