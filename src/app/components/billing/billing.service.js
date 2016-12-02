(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .factory('Billing', Billing);

    Billing.$inject = ['$resource', 'API_BASE_URL', '$q', 'ToastrService', '$http', 'BILLING_STATES'];

    /* @ngInject */
    function Billing($resource, API_BASE_URL, $q, ToastrService, $http, BILLING_STATES) {

        var resourceUrl = API_BASE_URL+'/emails/:id';

        var resource = $resource(resourceUrl, {}, {
            'update' : {method: 'PATCH', headers: { 'Content-Type': 'application/json' }}
        });

        var service = {
            get: get,
            update: update,
            getBillingState: getBillingState
        };

        return service;

        ////////////////

        function get(announcerId, startDate, endDate) {
            return $http({
                method: "GET",
                url: API_BASE_URL + '/billing/date/'+announcerId+'/'+startDate+'/'+endDate
            })
                .then(getBillingDataThen)
                .catch(getBillingDataCatch);

            function getBillingDataThen (response) {

                if (response.data.count === 0 ){
                    ToastrService.warning('No data available on those dates', 'No data');
                } else {
                    ToastrService.success('Data retrieved', 'Success');
                }

                return {
                    sendings: init(response.data.sendings),
                    count: response.data.count
                };
            }

            function getBillingDataCatch () {
                ToastrService.error('Impossible to retrieve billing data.', 'XHR Error');
                return $q.reject();
            }
        }

        function update(sending) {
            return resource.update({id: sending.id}, toPayloadFormat(sending)).$promise
                .then(onSuccess)
                .catch(onError);

            function onSuccess() {
                ToastrService.success('Sending updated', 'SUCCESS');
            }

            function onError(error) {
                ToastrService.error('Impossible to update sending', 'XHR Error');
                return $q.reject(error);
            }
        }

        /**
         * Return the billing state of a sending
         * @param sending
         */
        function getBillingState (sending) {

            if (!sending.aafNotified) {
                return BILLING_STATES.NOT_CHARGED;
            }
            else if (!sending.charged) {
                return BILLING_STATES.TO_CHARGED;
            }
            else if (!sending.paid) {
                return BILLING_STATES.CHARGED;
            }
            else {
                return BILLING_STATES.PAID;
            }
        }

        /**
         * Format the sendings in entry to several array in vm.sendings
         * to display as tabs according on their billing state
         * @param sendings: array[ sendings[], count: int ]
         * vm.sendings type : cf initializeSendings function under.
         */
        function init (sendings) {
            var sortedSendings = {
                notCharged: {informations: {name: "Sendings unbilled", index:{no: 0, name: 'notCharged'}}, list: []},
                toCharged: {informations: {name: "Sendings to charge", index:{no: 1, name: 'toCharged'}}, list: []},
                charged: {informations: {name: "Sendings charged", index:{no: 2, name: 'charged'}}, list: []},
                paid: {informations: {name: "Sendings paid", index:{no: 3, name: 'paid'}}, list: []}
            };

            for(var i = 0; i < sendings.length; i++){
                var billingState = getBillingState(sendings[i]);

                // string to number for ngModel on input type number
                sendings[i].incomeAaf = +sendings[i].incomeAaf;

                switch (billingState) {
                    case BILLING_STATES.NOT_CHARGED:
                        sortedSendings.notCharged.list.push(sendings[i]);
                        break;
                    case BILLING_STATES.TO_CHARGED:
                        sortedSendings.toCharged.list.push(sendings[i]);
                        break;
                    case BILLING_STATES.CHARGED:
                        sortedSendings.charged.list.push(sendings[i]);
                        break;
                    case BILLING_STATES.PAID:
                        sortedSendings.paid.list.push(sendings[i]);
                        break;
                    default:
                        ToastrService.error('Unknown billing state.');
                        break;
                }
            }

            return sortedSendings;
        }

        function toPayloadFormat(sending) {
            var tmp = Object.assign({}, sending);

            delete tmp.id;

            return tmp;
        }
    }

})();

