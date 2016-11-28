/**
 * Created by Axel on 28/11/2016.
 */
(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .factory('Router', Router);

    Router.$inject = ['$resource', '$q', 'ToastrService', 'API_BASE_URL'];

    /* @ngInject */
    function  Router($resource, $q, ToastrService, API_BASE_URL) {

        var resourceUrl = API_BASE_URL+'/api/routers/:id';

        var resource = $resource(resourceUrl, {}, {
            'update': {method: 'PATCH'}
        });

        /////////////////////////////////////////////

        var service = {
            getAll: getAll,
            init: init
        };

        return service;

        ////////////////////////////////////////////

        function getAll(context) {
            return resource.get({
                'context': angular.toJson(context)
            })
                .$promise
                .then(getRoutersThen)
                .catch(getRoutersCatch);

            function getRoutersThen(data) {
                return data.routers;
            }

            function getRoutersCatch(error) {
                ToastrService.error('Impossible to retrieve Routers','XHR Error');
                return $q.reject(error);
            }
        }

        function init() {
            var router = {
                name : '',
                ContactName : '',
                email : '',
                description : '',
                BillingContactName : '',
                ContactEmail : '',
                PhysicalAddress : '',
                PysicalAddressSecond : '',
                PostalNumber : '',
                town : '',
                Country : '',
                CompanyRegistryNumber : '',
                VATNumber : '',
                BillingPeriod : '',
                PaymentEndofmonth: ''
            };

            return router;
        }


    }

})();
