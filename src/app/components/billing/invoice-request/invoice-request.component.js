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

    InvoiceRequestController.$inject = ['Billing', 'AccountingSystem', 'BILLING_DOCUMENTS_TYPES', 'ACCOUNTING_SYSTEMS',
                                        'BILLING_STATES', 'DocumentSendDialog', 'ACCOUNTING_SYSTEM_SERVICES'];

    /* @ngInject */
    function InvoiceRequestController(Billing, AccountingSystem, BILLING_DOCUMENTS_TYPES, ACCOUNTING_SYSTEMS,
                                      BILLING_STATES, DocumentSendDialog, ACCOUNTING_SYSTEM_SERVICES) {
        var vm = this;

        var accountingSystem = null;

        vm.isLoading = false;
        vm.announcer = null;
        vm.date = null;
        vm.sendings = null;

        vm.$onInit = onInit;
        vm.onFiltersReceived = onFiltersReceived;
        vm.onUpdateSending = onUpdateSending;
        vm.createBillingDocument = createBillingDocument;
        vm.createAndSendBillingDocument = createAndSendBillingDocument;

        //////////////////

        function onInit() {
            accountingSystem = AccountingSystem.getServices();
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

        function onUpdateSending($event){
            if(!$event.sending || !$event.tabIndexName || $event.sendingIndex < 0){ return; }

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

        function createBillingDocument($event) {
            if (!$event.type) { return }

            switch ($event.type) {
                case BILLING_DOCUMENTS_TYPES.INVOICE:

                    return accountingSystem['Invoice'].create(vm.announcer, vm.sendings[BILLING_STATES.TO_CHARGED].list, vm.date)
                        .then(function(invoice){
                            Billing.changeSendingsState(vm.sendings, BILLING_STATES.TO_CHARGED, BILLING_STATES.CHARGED);
                            return invoice
                        });
                    break;
                case BILLING_DOCUMENTS_TYPES.WAITING_LIST:
                    break;
                default:
                    break;
            }
        }

        function createAndSendBillingDocument($event) {
            if (!$event.type) { return }

            switch($event.type){

                case BILLING_DOCUMENTS_TYPES.INVOICE:

                    return createBillingDocument($event)
                        .then(function(invoice){

                            if ( AccountingSystem.getName() !== ACCOUNTING_SYSTEMS["DATAENGINE"] )
                            {
                                DocumentSendDialog.openDialogModal(invoice.externalId, ACCOUNTING_SYSTEM_SERVICES.INVOICE.name, vm.announcer);
                                return invoice
                            }
                            DocumentSendDialog.openDialogModal(invoice.id, ACCOUNTING_SYSTEM_SERVICES.INVOICE.name, vm.announcer);

                            return invoice
                        });

                case BILLING_DOCUMENTS_TYPES.WAITING_LIST:
                    break;
                default:
                    break;
            }
        }
    }
})();



