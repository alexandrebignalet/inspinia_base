(function () {
    'use strict';

    var contact = {
        templateUrl: 'app/components/contact/contacts.html',
        controller: ContactController,
        controllerAs: 'vm',
        bindings: {
            contacts : '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('contact', contact);

    ContactController.$inject = ['DTOptionsBuilder'];

    /* @ngInject */
    function ContactController(DTOptionsBuilder) {
        var vm = this;
        vm.showContact = showContact;
        vm.showedContact = {};

        vm.$onInit = function() {
            if( vm.contacts.length > 0) {
                vm.showedContact = vm.contacts[0]
            }
        };

        function showContact(contact) {
            vm.showedContact = contact;
        }


    }

})();



