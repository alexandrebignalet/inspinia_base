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
            emitOnChangeCreateCompany: '&',
            isSaving: '<',
            onSaveAnnouncer: '&'
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
        vm.onChangeCreateCompany = onChangeCreateCompany;

        vm.$onInit = function() {
            vm.announcer.useCompanyAddress = (vm.announcer.address != '' && vm.announcer.address != null);
            vm.countries = COUNTRIES;
        };

        function onChangeCreateCompany() {
            if( vm.createCompany ){
                vm.announcer.useCompanyAddress = false;
            }

            vm.emitOnChangeCreateCompany( {
                $event: {
                    createCompany: vm.createCompany
                }
            });
        }


        // TODO : USE EVENT

        function save() {
            vm.onSaveAnnouncer({
                $event: {
                    announcer: vm.announcer
                }
            });
        }
    }

})();
