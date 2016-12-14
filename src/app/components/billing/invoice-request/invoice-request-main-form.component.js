(function () {
    'use strict';

    var invoiceRequestMainForm = {
        templateUrl: 'app/components/billing/invoice-request/invoice-request-main-form.html',
        controller: InvoiceRequestMainFormController,
        controllerAs: 'vm',
        require: '/bower_components/moment/moment',
        bindings: {
            announcers : '<',
            isLoading: '<',
            onFiltering: '&'
        }
    };

    angular
        .module('dataToolApp')
        .component('invoiceRequestMainForm', invoiceRequestMainForm);

    InvoiceRequestMainFormController.$inject = ['moment'];

    /* @ngInject */
    function InvoiceRequestMainFormController(moment) {
        var vm = this;

        vm.onSubmit = onSubmit;

        vm.$onInit = onInit;

        function onInit(){
            vm.announcerSelected = vm.announcers[0];
            vm.month = moment();
        }

        function onSubmit(){
            var startDate = vm.month.startOf('month').format('YYYY-MM-DD');
            var endDate = vm.month.endOf('month').format('YYYY-MM-DD');

            vm.onFiltering({
                $event: {
                    announcer: vm.announcerSelected,
                    date: {
                        start: startDate,
                        end: endDate
                    }
                }
            });
        }
    }

})();



