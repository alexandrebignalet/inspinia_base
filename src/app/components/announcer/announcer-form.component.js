(function () {
    'use strict';

    var announcerForm = {
        templateUrl: 'app/components/announcer/announcer-form.html',
        controller: AnnouncerFormController,
        controllerAs: 'vm',
        bindings: {
            entity: '<',
            onSaveEntity: '&'
        }
    };

    angular
        .module('dataToolApp')
        .component('announcerForm', announcerForm);

    AnnouncerFormController.$inject = [];

    /* @ngInject */
    function AnnouncerFormController() {
        var vm = this;
        vm.isSaving = false;
        vm.save = save;

        vm.$onInit = function() {
            vm.announcer =  vm.entity;

            console.log(vm.announcer);
        };

        function save() {
            vm.onSaveEntity({announcer: vm.announcer});
        }
    }

})();
