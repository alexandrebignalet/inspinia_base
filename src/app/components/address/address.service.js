(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .factory('Address', Address);

    Address.$inject = ['$resource', 'ToastrService', '$q', 'API_BASE_URL'];

    /* @ngInject */
    function Address($resource, ToastrService, $q, API_BASE_URL) {

        var resourceUrl = API_BASE_URL + '/api/addresses/:id';

        var resource = $resource(resourceUrl, {}, {
            "update": {method: 'PATCH'}
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

        ////////////////

        function getAll(context) {
            return resource.get({ 'context': angular.toJson(context) })
                .$promise
                .then(getAddressesThen)
                .catch(getAddressesCatch);

            function getAddressesThen(data){ return data.addresses }
            function getAddressesCatch(error){
                ToastrService.error(error, 'XHR Error');
                return $q.reject(error);
            }
        }

        function get(id, context) {
            return resource.get({'id': id, 'context': context})
                .$promise
                .then(getAddressThen)
                .catch(getAddressCatch);

            function getAddressThen(data){
                delete data.$promise;
                delete data.$resolved;

                return data
            }
            function getAddressCatch(error){
                ToastrService.error(error, 'XHR Error');
                return $q.reject(error);
            }
        }

        function save(address){
            return resource.save(toPayloadFormat(address))
                .$promise
                .then(onSaveSuccess)
                .catch(onSaveError);

            function onSaveSuccess(data){ return data }
            function onSaveError(error){
                ToastrService.error(error, 'XHR Error');
                return $q.reject(error);
            }
        }

        function update(address){
            return resource.update({'id': address.id}, toPayloadFormat(address))
                .$promise
                .then(onSaveSuccess)
                .catch(onSaveError);

            function onSaveSuccess(data){ return data }
            function onSaveError(error){
                ToastrService.error(error, 'XHR Error');
                return $q.reject(error);
            }
        }

        function remove(addressId){
            return resource.delete({'id': addressId})
                .$promise
                .then(onSaveSuccess)
                .catch(onSaveError);

            function onSaveSuccess(data){ return data }
            function onSaveError(error){
                ToastrService.error(error, 'XHR Error');
                return $q.reject(error);
            }
        }

        function init() {
            return {
                country: null,
                street: null,
                town: null,
                zipcode: null,
                complement: null
            }
        }

        function toPayloadFormat(address){
            var tmp = Object.assign({}, address);

            delete tmp.company;
            delete tmp.id;

            return tmp;
        }
    }

})();

