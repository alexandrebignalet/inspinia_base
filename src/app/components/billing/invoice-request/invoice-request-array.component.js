(function () {
    'use strict';

    var invoiceRequestArray = {
        templateUrl: 'app/components/billing/invoice-request/invoice-request-array.html',
        controller: InvoiceRequestArrayController,
        controllerAs: 'vm',
        bindings: {
            sendings : '<',
            isLoading: '<',
            onPatch: '&',
            onCreateDocument: '&'
        }
    };

    angular
        .module('dataToolApp')
        .component('invoiceRequestArray', invoiceRequestArray);

    InvoiceRequestArrayController.$inject = ['DTOptionsBuilder', 'DTColumnDefBuilder', 'CommentSending', 'ToastrService', 'BILLING_DOCUMENTS_TYPES'];

    function InvoiceRequestArrayController(DTOptionsBuilder, DTColumnDefBuilder, CommentSending, ToastrService, BILLING_DOCUMENTS_TYPES){
        var vm = this;

        vm.update = update;
        vm.createDocument = createDocument;
        vm.$onInit = onInit;

        function onInit(){
            vm.isSaving = false;

            vm.pagination = {
                currentPage: 1,
                itemsPerPage: 50,
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

        function createDocument(type){
            if ( !BILLING_DOCUMENTS_TYPES.hasOwnProperty( type.toUpperCase() ) ){
                throw new Error('Unknown billing document type, refer to invoice-request.constant.js to see types.')
            }

            vm.onCreateDocument({
                $event: {
                    type: type
                }
            })
        }
    }
})();



