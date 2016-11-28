(function () {
    'use strict';

    var contactShow = {
        templateUrl: 'app/components/contact/contact-show.html',
        controller: ContactShowController,
        controllerAs: 'vm',
        bindings: {
            contact: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('contactShow', contactShow);

    ContactShowController.$inject = [];

    /* @ngInject */
    function ContactShowController() {}
})();



