(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .factory('Billing', Billing);

    Billing.$inject = ['$resource', 'API_BASE_URL', '$q', 'ToastrService', '$http'];

    /* @ngInject */
    function Billing($resource, API_BASE_URL, $q, ToastrService, $http) {

        var resourceUrl = API_BASE_URL+'/emails/:id';

        var resource = $resource(resourceUrl, {}, {
            'update' : {method: 'PATCH', headers: { 'Content-Type': 'application/json' }}
        });

        var service = {
            get: get,
            update: update
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
                    sendings: response.data.sendings,
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

        function toPayloadFormat(sending) {
            var tmp = Object.assign({}, sending);

            delete tmp.id;

            return tmp;
        }
    }

})();

