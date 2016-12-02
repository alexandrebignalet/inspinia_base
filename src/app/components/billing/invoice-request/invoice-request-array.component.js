(function () {
    'use strict';

    var invoiceRequestArray = {
        templateUrl: 'app/components/billing/invoice-request/invoice-request-array.html',
        controller: InvoiceRequestArrayController,
        controllerAs: 'vm',
        bindings: {
            sendings : '<',
            onPatch: '&',
            isLoading: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('invoiceRequestArray', invoiceRequestArray);

    InvoiceRequestArrayController.$inject = ['DTOptionsBuilder', 'DTColumnDefBuilder'];

    function InvoiceRequestArrayController(DTOptionsBuilder, DTColumnDefBuilder){
        var vm = this;

        vm.update = update;
        vm.$onInit = onInit;

        function onInit(){
            vm.pagination = {
                currentPage: 1,
                itemsPerPage: 10,
                maxSize: 6
            };

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
        }

        function update(sending, tabIndexName, sendingIndex){
            vm.onPatch({
                $event:{
                    sending: sending,
                    tabIndexName: tabIndexName,
                    sendingIndex: sendingIndex
                }
            })
        }
    }
})();



