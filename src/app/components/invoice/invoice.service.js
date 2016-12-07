(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .factory('Invoice', Invoice);

    Invoice.$inject = ['$resource','API_BASE_URL', 'ToastrService', '$q'];

    function Invoice ($resource, API_BASE_URL, ToastrService, $q) {

        var resourceUrl = API_BASE_URL + '/api/invoices/:id';

        var resource = $resource( resourceUrl, {}, {
            save:   { method: 'POST' },
            update: { method: 'PATCH' },
            delete: { method: 'DELETE' },
            send:   { method: 'GET', url: API_BASE_URL + '/api/invoices/:id/send' },
            pdf:    { method: 'GET', url: API_BASE_URL + '/api/invoices/:id/pdf' }
        });

        //////////////////////////////

        var service = {
            get: get,
            getAll: getAll,
            save: save,
            update: update,
            init: init,
            send: send,
            pdf: pdf,
            generateDocNumber: generateDocNumber
        };

        return service;

        function get(id, context){
            return resource.get({
                'id':id,
                'context': angular.toJson(context)
            })
                .$promise
                .then(onGetSuccess)
                .catch(onGetError);

            function onGetSuccess(data){
                delete data.$promise;
                delete data.$resolved;

                return data;
            }

            function onGetError(error){
                ToastrService.error(error, 'Impossible to get the invoice.');
                return $q.reject(error);
            }
        }

        function getAll(context){
            return resource.get({
                'context': angular.toJson(context)
            })
                .$promise
                .then(onGetAllSuccess)
                .catch(onGetAllError);

            function onGetAllSuccess(data){
                return data.databases;
            }

            function onGetAllError(error){
                ToastrService.error(error, 'Impossible to get all the databases.');
                return $q.reject(error);
            }
        }

        function save(invoice){
            return resource
                .save(toPayloadFormat(invoice))
                .$promise
                .then(onSaveSuccess)
                .catch(onSaveError);

            function onSaveSuccess(data){
                return data;
            }

            function onSaveError(error){
                ToastrService.error(error, 'Impossible to save the invoice.');
                return $q.reject(error);
            }
        }

        function update(invoice){
            return resource
                .update({'id': invoice.id }, toPayloadFormat(invoice))
                .$promise
                .then(onPatchSuccess)
                .catch(onPatchError);

            function onPatchSuccess(data){
                return data;
            }

            function onPatchError(error){
                ToastrService.error(error, 'Impossible to save the invoice.');
                return $q.reject(error);
            }
        }

        function init(){
            return {
                id: null
            };
        }

        function toPayloadFormat(invoice){
            var tmp = Object.assign({}, invoice);

            delete tmp.id;

            return tmp;
        }

        /**
         * Return the unique number for an invoice based on the ids of datatool invoices objects
         * template of doc number: YYYY_MON_MM_id
         * YYYY: year ; MM: month ; MON: predefined ; id: last invoice id + 1
         */
        function generateDocNumber() {
            var year = moment().format('YYYY');
            var month = moment().format('MM');

            return resource.get({ limit: 1, sort: 'desc' })
                .$promise
                .then(getLastInvoiceIdSuccess)
                .catch(getLastInvoiceIdFailed);


            function getLastInvoiceIdSuccess (result) {
                var id = result.invoices.length === 0 ? 1 : result.invoices[0].id+1;
                return year+'_MON_'+month+'_'+id;
            }
            function getLastInvoiceIdFailed (error) {
                ToastrService.error('Cannot get last invoice id from DataEngine.', 'Invoice request');
                return $q.reject(error);
            }
        }

        function send(id, email, prefs) {
            return resource.send({ id: id, email: email, subject: prefs.subject, message: prefs.message })
                .$promise
                .then(onSendSuccess)
                .catch(onSendError);

            function onSendSuccess(data){
                return data;
            }
            function onSendError(error){
                ToastrService.error(error, 'Impossible to send the invoice.');
                return $q.reject(error);
            }
        }

        function pdf(id) {
            return resource.send({ id: id })
                .$promise
                .then(onPdfSuccess)
                .catch(onPdfError);

            function onPdfSuccess(pdf){
                var file = new Blob([pdf.data], {type: 'application/pdf'});
                return URL.createObjectURL(file);
            }
            function onPdfError(error){
                ToastrService.error(error, 'Impossible to generate the invoice pdf.');
                return $q.reject(error);
            }
        }
    }
})();
