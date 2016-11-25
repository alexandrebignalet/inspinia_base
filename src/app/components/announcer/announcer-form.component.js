(function () {
    'use strict';

    var announcerForm = {
        templateUrl: 'app/components/announcer/announcer-form.html',
        controller: AnnouncerFormController,
        controllerAs: 'vm',
        bindings: {
            announcer: '<',
            companies: '<',
            contacts: '<',
            isSaving: '<',
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
            vm.announcer.useCompanyAddress = (vm.announcer.address != '' && vm.announcer.address != null);
            vm.countries = COUNTRIES;
        };

        // TODO : USE EVENT

        function save() {
            vm.onSaveEntity({
                $event: {
                    announcer: vm.announcer
                }
            });
        }
    }

})();
