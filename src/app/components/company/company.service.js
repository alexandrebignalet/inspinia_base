(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .factory('Company', Company);

    Company.$inject = ['$resource', '$q', 'ToastrService', 'API_BASE_URL', 'Contact'];

    /* @ngInject */
    function  Company($resource, $q, ToastrService, API_BASE_URL, Contact) {

        var resourceUrl = API_BASE_URL + '/api/companies/:id';

        var resource = $resource( resourceUrl, {}, {
            'save': { method:'POST'},
            'update': { method:'PATCH'},
            'delete':{ method:'DELETE'}
        });

        var service = {
            getAll: getAll,
            get: get,
            save: save,
            update: update,
            delete: remove,
            init: init,
            getBillingContact: getBillingContact
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
                num_tva: null,
                percent_tva: null,
                databases: [],
                mg_global: null,
                payment_period: null,
                invoice_delivery_day: null,
                quick_books_id: null,
                contacts: [],
                address: null
            };
        }

        function getBillingContact(company){
            if (!company.contacts){
                ToastrService.warning(company.name + ' doesn\'t have any contacts.');
                return;
            }

            return findBillingContact(company.contacts);

            function findBillingContact(contacts){

                for(var i = 0; i < contacts.length ; i++){
                    if (Contact.isBillingTyped(contacts[i])){
                        return contacts[i];
                    }
                }

                return null;
            }
        }

        function toPayloadFormat(company){
            var tmp = Object.assign({}, company);

            delete tmp.id;
            delete tmp.lots;
            delete tmp.announcers;

            tmp.address = company.address.id;

            if (tmp.contacts.length > 0){
                var tmpContacts = [];
                for(var i = 0; i < tmp.contacts.length; i++){
                    tmpContacts.push({'id': tmp.contacts[i]['id']});
                }
                tmp.contacts = tmpContacts;
            }

            if (tmp.databases.length > 0){
                var tmpDatabases = [];
                for(var y = 0; y < tmp.databases.length; y++){
                    tmpDatabases.push({'id': tmp.databases[y]['id']});
                }
                tmp.databases = tmpDatabases;
            }

            return tmp;
        }
    }

})();

