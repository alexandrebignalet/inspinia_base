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

    InvoiceRequestController.$inject = ['DTOptionsBuilder', 'Billing'];

    /* @ngInject */
    function InvoiceRequestController(DTOptionsBuilder, Billing) {
        var vm = this;

        vm.isLoading = false;
        vm.onFiltersReceived = onFiltersReceived;

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

        function onFiltersReceived($event){
            if(!$event.date || !$event.announcer){ return; }

            vm.isLoading = true;

            vm.announcer = $event.announcer;
            vm.date = $event.date;

            Billing.get(vm.announcer.id, vm.date.start, vm.date.end)
                .then(onSuccess)
                .catch(onError);

            function onSuccess(data){
                vm.sendings = data.sendings;
                vm.isLoading = false;
            }
            function onError(){
                vm.isLoading = false;
            }
        }
    }
})();



