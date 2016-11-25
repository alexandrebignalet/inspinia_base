(function () {
    'use strict';

    var contactForm = {
        templateUrl: 'app/components/contact/contact-form.html',
        controller: ContactFormController,
        controllerAs: 'vm',
        bindings: {
            contact: '<',
            companies: '<',
            onSaveContact: '&',
            isSaving: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('contactForm', contactForm);

    ContactFormController.$inject = ['TYPE_BILLING', 'TYPE_COMMERCIAL'];

    /* @ngInject */
    function ContactFormController(TYPE_BILLING, TYPE_COMMERCIAL) {
        var vm = this;
        vm.onSubmit = onSubmit;

        vm.types = [
            TYPE_BILLING,
            TYPE_COMMERCIAL
        ];

        vm.$onChange = function(changes){
            if(changes.contact){
                vm.contact = changes.contact;
            }
        };

        function onSubmit() {
            vm.onSaveContact({
                $event: {
                    contact: vm.contact
                }
            });
        }
    }

})();
