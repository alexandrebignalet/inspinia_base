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

    ContactController.$inject = [];

    /* @ngInject */
    function ContactController() {
        var vm = this;

        ////////////////

    }

})();



