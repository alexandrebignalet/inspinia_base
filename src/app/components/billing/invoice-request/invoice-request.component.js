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

    InvoiceRequestController.$inject = ['Billing'];

    /* @ngInject */
    function InvoiceRequestController(Billing) {
        var vm = this;

        vm.isLoading = false;

        vm.onFiltersReceived = onFiltersReceived;
        vm.onUpdateSending = onUpdateSending;


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

        function onUpdateSending($event){
            console.log(!$event.sending, !$event.tabIndexName, !$event.sendingIndex, $event.sendingIndex)
            if(!$event.sending || !$event.tabIndexName || angular.isDefined($event.sendingIndex)){ return; }

            vm.isLoading = true;

            Billing.update($event.sending)
                .then(onSuccess)
                .catch(onError);

            function onSuccess(){
                var newBillingState = Billing.getBillingState($event.sending);
                sortSending($event.sending, $event.tabIndexName, $event.sendingIndex, newBillingState);
                vm.isLoading = false;
            }
            function onError(){
                vm.isLoading = false;
            }
        }

        /**
         * Sort a sending according on his billing state
         *
         * On update success, a sending will change of billing state
         * So it has to change of array (toCharged[] -> charged[])
         * Remove sending from the fist array then add it to the go one.
         * @param sending
         * @param tabIndexName: current tab name
         * @param sendingIndex: the index of the sending in the vm.sendings[tabIndexName]
         * @param newBillingState
         */
        function sortSending (sending, tabIndexName, sendingIndex, newBillingState) {
            //remove the sending from the old billing state array
            vm.sendings[tabIndexName].list.splice(sendingIndex, 1);

            //add to the new billing state array
            vm.sendings[newBillingState].list.push(sending);
        }
    }
})();



