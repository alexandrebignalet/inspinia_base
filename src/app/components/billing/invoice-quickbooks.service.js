(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .factory('InvoiceQuickbooks', InvoiceQuickbooks);

    InvoiceQuickbooks.$inject = ['Invoice', 'QuickbooksDataService', 'AuthQuickbooks', 'ToastrService', 'Company'];

    /* @ngInject */
    function InvoiceQuickbooks(Invoice, QuickbooksDataService, AuthQuickbooks, ToastrService, Company) {

        const entityAlias = 'Invoice';

        var service = {
            create: create,
            send: send,
            createAndSend: createAndSend
        };

        return service;

        ////////////////

        function create(announcer, sendings, month) {
            var quickbooksFormattedInvoice = createQuickbooksType(announcer, sendings);

            var addingDocNumberPromise = Invoice.generateDocNumber()
                .then(function(docNumber){

                    quickbooksFormattedInvoice['DocNumber'] = docNumber;

                    return quickbooksFormattedInvoice;
                });

            return addingDocNumberPromise
                    .then(function(invoiceFormatted){
                        return QuickbooksDataService.save(entityAlias, invoiceFormatted)
                    })
                    .then(function(invoiceSaved){
                        var invoice = transformer(invoiceSaved, announcer, month);
                        return Invoice.save(invoice)
                    })
                    .then(function(){
                        return ToastrService.success('Invoice created', 'Quickbooks');
                    })
        }

        function send(){}
        function createAndSend(){}

        function transformer(quickbooksFormattedInvoice, announcer, month) {
            var invoice = {};

            if (quickbooksFormattedInvoice.EmailStatus === 'EmailSent') {
                invoice.recipients = [ quickbooksFormattedInvoice['BillEmail']['Address'] ];
                invoice.sentByMail = true;
                return JSON.stringify(invoice);
            }

            invoice = {
                docNumber: quickbooksFormattedInvoice['DocNumber'],
                externalId: quickbooksFormattedInvoice['Id'],
                company: announcer.company.id,
                referenceDate: month.start,
                sentByMail :false,
                sender: "Get the email from current user pls",
                amount: quickbooksFormattedInvoice['Balance'],
                emails: []

            };

            var sendingCharged = JSON.parse(quickbooksFormattedInvoice['PrivateNote']);

            for (var i = 0; i < sendingCharged.length ; i++) {
                var idSending = { id: sendingCharged[i] };

                invoice.emails.push(idSending);
            }

            return invoice;
        }

        /**
         *
         * @param announcer
         * @param sendings
         * @returns InvoiceQuickbooks || -1
         * return the quickbooks invoice formatted or -1 if anything went bad
         */
        function createQuickbooksType(announcer, sendings) {
            var invoice = {};

            if (!sendings || sendings.length < 1) {
                ToastrService.error('No sendings to generate the invoice.');
                return -1;
            }

            var billingContact = Company.getBillingContact(announcer.company);

            if (!announcer) {
                ToastrService.error('Select an announcer.');
                return -1;

            } else if (!announcer.company) {
                ToastrService.error('Add a company to the announcer ' + announcer.announcer + '.');
                return -1;

            } else if (!billingContact) {
                ToastrService.error('Add a billing contact to the company ' + announcer.company.name + '.');
                return -1;
            }

            if (!announcer.company.quick_books_id) {
                ToastrService.error('Add a Quickbooks ID to the company ' + announcer.company.name + '.');
                return -1;
            }

            if (!announcer.company.address) {
                ToastrService.error('Add an address to the company ' + announcer.company.name + '.');
                return -1;
            }

            invoice = {
                Line: [],
                DocNumber: 0,
                CustomerRef: {
                    value: String(announcer.company.quick_books_id),
                    name: String(announcer.company.name)
                },
                BillAddr: {
                    Line1: announcer.company.address.street,
                    City: announcer.company.address.town,
                    CountrySubDivisionCode: announcer.company.address.country,
                    PostalCode: announcer.company.address.zipcode
                },
                SalesTermRef: {
                    value: 0
                },
                EmailStatus: "NeedToSend",
                BillEmail: {
                    Address: billingContact.mail
                },
                DueDate: moment().add(announcer.company.payment_period, 'days').format('YYYY-MM-DD')
            };

            switch (announcer.company.payment_period) {
                case 0:
                    invoice.SalesTermRef.value = '1';
                    break;
                case 10:
                    invoice.SalesTermRef.value = '2';
                    break;
                case 15:
                    invoice.SalesTermRef.value = '3';
                    break;
                case 30:
                    invoice.SalesTermRef.value = '4';
                    break;
                case 60:
                    invoice.SalesTermRef.value = '5';
                    break;
                default:
                    invoice.SalesTermRef.value = '1';
                    break;
            }
            //TODO get CountryCode from the Agency of the App when available
            if (invoice.BillAddr.CountrySubDivisionCode === 'ES') {

                invoice.TxnTaxDetail = {
                    TxnTaxCodeRef: {
                        "value": "4"
                    },
                    TaxLine: [{
                        DetailType: "TaxLineDetail",
                        TaxLineDetail: {
                            TaxRateRef: {
                                value: "4"
                            },
                            PercentBased: true
                        }
                    }]
                };
            }

            var sendingIds = [];
            angular.forEach(sendings, function (sending, index) {

                /** Those campaign ids will be stored in the Quickbooks Invoice
                 *  PrivateNote in order to retrieve all the campaigns of an Invoice
                 *  just with Quickbooks
                 *  SYNCHRONISATION
                 */
                sendingIds.push(sending.id);

                invoice.Line.push(
                    {
                        Description: sending.subject,
                        Amount: +sending.incomeAaf,
                        DetailType: "SalesItemLineDetail",
                        SalesItemLineDetail: {
                            Qty: 1,
                            ItemRef: {
                                value: "1",
                                name: "Monetization"
                            }
                        }
                    }
                );

                if (invoice.BillAddr.CountrySubDivisionCode === 'ES') {
                    invoice.Line[index]['SalesItemLineDetail']['TaxCodeRef'] = {
                        "value": "TAX"
                    };
                }
                else {
                    invoice.Line[index]['SalesItemLineDetail']['TaxCodeRef'] = {
                        "value": "NON"
                    };
                }
            });

            invoice.PrivateNote = JSON.stringify(sendingIds);

            if (invoice.Line.length === 0) {
                ToastrService.error('Invoice not generated.');
                return -1;
            }

            return invoice;
        }
    }

})();

