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
            save: save,
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

        function save(router) {
            return resource.save(router, onSaveSuccess, onSaveError).$promise;

            function onSaveSuccess(response) {
                ToastrService.success('Router created', 'SUCCESS');
            }

            function onSaveError(error) {
                ToastrService.error('Impossible to create router', 'ERROR');
                $q.reject(error);
            }
        }

        function init() {
            var router = {
                name : 'Nelmio',
                ContactName : 'Contact name',
                email : 'email@g.c',
                description : 'Thats a good description',
                BillingContactName : 'Billing contact name',
                Contactemail : 'contact@email.com',
                PhysicalAddress : 'Physical address',
                PhysicalAddressSecond : 'Second address',
                PostalNumber : '64000',
                town : 'Barcelona',
                Country : '',
                CompanyRegistryNumber : '123546798',
                VATNumber : 'Vatnumber123165',
                BillingPeriod : 10,
                PaymentEndofmonth: true
            };

            return router;
        }


    }

})();
