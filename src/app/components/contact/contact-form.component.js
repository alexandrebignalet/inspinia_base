(function () {
    'use strict';

    var contactForm = {
        templateUrl: 'app/components/contact/contact-form.html',
        controller: ContactFormController,
        controllerAs: 'vm',
        bindings: {
            entity: '<',
            companies: '<',
            onSaveEntity: '&'
        }
    };

    angular
        .module('dataToolApp')
        .component('contactForm', contactForm);

    ContactFormController.$inject = [];

    /* @ngInject */
    function ContactFormController() {
        var vm = this;
        vm.isSaving = false;
        vm.save = save;

        vm.types = [
            'Billing',
            'Commercial'
        ];

        vm.civilities = [
            'Monsieur',
            'Madame'
        ];

        vm.$onInit = function() {
            vm.contact =  vm.entity;
        };

        function save() {
            vm.onSaveEntity({contact: vm.contact});
        }
    }

})();
