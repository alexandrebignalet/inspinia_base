(function () {
    'use strict';

    var contactShow = {
        templateUrl: 'app/components/contact/contact-show.html',
        controller: ContactShowController,
        controllerAs: 'vm',
        bindings: {
            contact: '<',
            format: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('contactShow', contactShow);

    ContactShowController.$inject = [];

    /* @ngInject */
    function ContactShowController() {
        var vm = this;
        vm.showButtons = true;
        vm.showPicture = true;

        vm.$onInit = function() {
            if( vm.format ==  'summary' ){
                vm.showButtons = false;
                vm.showPicture = false;
            }
        }
    }
})();



