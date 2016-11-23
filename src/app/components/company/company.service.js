(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .factory('Company', Company);

    Company.$inject = ['$resource', '$q', 'ToastrService', 'API_BASE_URL'];

    /* @ngInject */
    function  Company($resource, $q, ToastrService, API_BASE_URL) {

        var resourceUrl = API_BASE_URL + '/api/companies/:id';

        var resource = $resource( resourceUrl, {}, {
            'save': { method:'POST'},
            'patch': { method:'PATCH'},
            'delete':{ method:'DELETE'}
        });

        var service = {
            getAll: getAll,
            get: get,
            save: save,
            update: update,
            delete: remove,
            init: init
        };

        return service;

        function getAll(context) {
            return resource.get({
                'context': angular.toJson(context)
            })
                .$promise
                .then(getCompaniesThen)
                .catch(getCompaniesError);

            function getCompaniesThen(data) { return data.companies }
            function getCompaniesError(error) {
                ToastrService.error(error, 'XHR Error');
                return $q.reject(error);
            }
        }

        function get(id, context) {
            return resource.get({
                'id': id,
                'context': angular.toJson(context)
            })
                .$promise
                .then(getCompanyThen)
                .catch(getCompanyError);

            function getCompanyThen(data) {
                delete data.$promise;
                delete data.$resolved;

                return data;
            }

            function getCompanyError(error) {
                ToastrService.error(error, 'XHR Error');
                return $q.reject(error);
            }
        }

        function save(company) {
            return resource.save(toPayloadFormat(company))
                .$promise
                .then(saveCompanyThen)
                .catch(saveCompanyError);

            function saveCompanyThen(data) { return data }
            function saveCompanyError(error) {
                ToastrService.error(error, 'XHR Error');
                return $q.reject(error);
            }
        }

        function update(company) {
            return resource.update({'id': company.id}, toPayloadFormat(company))
                .$promise
                .then(saveCompanyThen)
                .catch(saveCompanyError);

            function saveCompanyThen(data) { return data }
            function saveCompanyError(error) {
                ToastrService.error(error, 'XHR Error');
                return $q.reject(error);
            }
        }

        function remove(companyId) {
            return resource.delete({'id': companyId})
                .$promise
                .then(saveCompanyThen)
                .catch(saveCompanyError);

            function saveCompanyThen(data) { return data }
            function saveCompanyError(error) {
                ToastrService.error(error, 'XHR Error');
                return $q.reject(error);
            }
        }

        function init(){
            return {
                id: null,
                name: null,
                phone: null,
                numTva: null,
                percentTva: null,
                databases: null,
                mgGlobal: null,
                paymentPeriod: null,
                invoiceDeliveryDay: null,
                quickBooksId: null,
                contacts: null,
                address: null
            };
        }

        function toPayloadFormat(company){
            var tmp = Object.assign({}, company);

            delete tmp.id;

            return tmp;
        }
    }

})();

