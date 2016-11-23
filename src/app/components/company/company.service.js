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

        function getAll(context) {
            return resource.get({
                'context': angular.toJson(context)
            }).$promise
                .then(getContactsThen)
                .catch(getContactsError);

            function getContactsThen(data) {
                return data.companies;
            }

            function getContactsError(error) {
                ToastrService.error('Impossible to retrieve Companies','XHR Error');
                return $q.reject(error);
            }
        }

        return {
            getAll: getAll
        }
    }

})();

