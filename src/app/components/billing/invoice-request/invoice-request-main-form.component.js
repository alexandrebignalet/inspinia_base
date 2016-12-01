(function () {
    'use strict';

    var invoiceRequestMainForm = {
        templateUrl: 'app/components/billing/invoice-request/invoice-request-main-form.html',
        controller: InvoiceRequestMainFormController,
        controllerAs: 'vm',
        bindings: {
            announcers : '<',
            onDataReceived: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('invoiceRequestMainForm', invoiceRequestMainForm);

    InvoiceRequestMainFormController.$inject = ['Billing'];

    /* @ngInject */
    function InvoiceRequestMainFormController(Billing) {
        var vm = this;

        vm.onSubmit = onSubmit;

        vm.$onInit = onInit;

        function onInit(){
            vm.announcerSelected = vm.announcers[0];
            vm.isLoading = false;
            vm.month = moment();
        }

        function onSubmit(){
            var startDate = vm.month.startOf('month').format('YYYY-MM-DD');
            var endDate = vm.month.endOf('month').format('YYYY-MM-DD');

            Billing.get(vm.announcerSelected.id, startDate, endDate)
                .then(onBillingDataReceived);

            function onBillingDataReceived(billingData){
                vm.onDataReceived({
                    $event: {
                        data: billingData
                    }
                })
            }
        }
    }

})();



