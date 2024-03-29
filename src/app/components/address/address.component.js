(function () {
    'use strict';
    /**
     * Special name in comparison with the others components to avoid conflits with
     * <address></address> -> HTML5 built-in directive
     */
    var addressMain = {
        templateUrl: 'app/components/address/addresses.html',
        controller: AddressController,
        controllerAs: 'vm',
        bindings: {
            addresses : '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('addressMain', addressMain);

    AddressController.$inject = ['DTOptionsBuilder'];

    /* @ngInject */
    function AddressController(DTOptionsBuilder) {
        var vm = this;

        ////////////////

        vm.$onInit = function () {
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
    }

})();



