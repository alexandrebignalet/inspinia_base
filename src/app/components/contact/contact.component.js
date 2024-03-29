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

            vm.dtOptions = DTOptionsBuilder.newOptions()
                .withDOM('<"html5buttons"B>lfrtip')
                .withBootstrap()
                .withButtons([
                    {extend: 'copy'},
                    {extend: 'csv'},
                    {extend: 'excel', title: 'ExampleFile'},
                    {extend: 'pdf', title: 'ExampleFile'},
                    {extend: 'print',
                        customize: function (win){
                            angular.element(win.document.body).addClass('white-bg');
                            angular.element(win.document.body).css('font-size', '10px');

                            angular.element(win.document.body).find('table')
                                .addClass('compact')
                                .css('font-size', 'inherit');
                        }
                    }
                ]);
        };

        function showContact(contact) {
            vm.showedContact = contact;
        }


    }

})();



