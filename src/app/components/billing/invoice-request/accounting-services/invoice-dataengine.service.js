(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .factory('InvoiceDataEngine', InvoiceDataEngine);

    InvoiceDataEngine.$inject = ['Invoice', 'ToastrService'];

    /* @ngInject */
    function InvoiceDataEngine(Invoice, ToastrService) {

        var service = {
            create: create,
            send: send,
            pdf: getPdf,
            mailPreferences: getMailPreferences
        };

        return service;

        ////////////////

        function create(announcer, sendings, month) {
            var invoice = Invoice.init();

            return Invoice.generateDocNumber()
                .then(function(docNumber){
                    var amount = 0;

                    invoice.docNumber = docNumber;
                    invoice.referenceDate = month.start;
                    invoice.company = announcer.company.id;

                    angular
                        .forEach(sendings, function(sending){
                            sending.invoice = invoice.docNumber;
                            invoice.emails.push({ id: sending.id });
                            amount += sending.income
                        });

                    invoice.amount = amount;

                    return invoice
                })
                .then(Invoice.save)
                .then(function(invoice){
                    ToastrService.success('Invoice created', 'DataEngine');
                    return invoice
                })
        }

        function send(id, mail, preferences){

            return Invoice.send(id, mail, preferences)
        }

        function getPdf(id){
            return Invoice.pdf(id);
        }

        function getMailPreferences() {

            return {
                subject: null,
                message: null
            }
        }
    }

})();

