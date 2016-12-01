(function () {
    'use strict';

    var invoiceRequest = {
        templateUrl: 'app/components/billing/invoice-request/invoice-request.html',
        controller: InvoiceRequestController,
        controllerAs: 'vm',
        bindings: {
            announcers : '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('invoiceRequest', invoiceRequest);

    InvoiceRequestController.$inject = ['DTOptionsBuilder', 'ToastrService'];

    /* @ngInject */
    function InvoiceRequestController(DTOptionsBuilder, ToastrService) {
        var vm = this;

        vm.onDataReceived = onDataReceived;

        vm.$onInit = onInit;

        function onInit() {
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

            // vm.DTColumnDefs = [
            //     DTColumnDefBuilder.newColumnDef(5).notSortable()
            // ];
        }

        function onDataReceived($event){
            console.log($event);
            if(!$event.data){ return; }

            if($event.data.length === 0){
                ToastrService.error('No Data', 'Empty');
            }
        }
    }
})();



