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
            get:    get,
            save:   save,
            update: update,
            init:   init
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

        function get(routerId, context) {
            return resource.get({
                id: routerId,
                'context': angular.toJson(context)
            })
                .$promise
                .then(onGetSuccess)
                .catch(onGetError);

            function onGetSuccess(response) {
                console.log(response);

                return toFormFormat(response);
            }

            function onGetError(error) {
                ToastrService.error('Impossible to retrieve Router', 'XHR Error');
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
        function update(router) {
            return resource.update({id: router.id}, toPayloadFormat(router)).$promise
                .then(onSuccess)
                .catch(onError);

            function onSuccess() {
                ToastrService.success('Router edited', 'SUCCESS');
            }

            function onError(error) {
                ToastrService.error('Impossible to edit router', 'XHR Error');
                return $q.reject(error);
            }
        }


        function toFormFormat(router) {

            var tmp = {
                id: router.id,
                name : router.name,
                ContactName : router._contact_name,
                email : router.email,
                description : router.description,
                BillingContactName : router._billing_contact_name,
                Contactemail : router._contactemail,
                PhysicalAddress : router._physical_address,
                PhysicalAddressSecond : router._physical_address_second,
                PostalNumber : router._postal_number,
                town : router.town,
                Country : router._country,
                CompanyRegistryNumber : router._company_registry_number,
                VATNumber : router._v_a_t_number,
                BillingPeriod : router._billing_period,
                PaymentEndofmonth: router._payment_endofmonth
            };

            return tmp;
        }

        function toPayloadFormat(router) {
            var tmp = Object.assign({}, router);

            delete tmp.id;

            return tmp;
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
