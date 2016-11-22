(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .factory('Contact', Contact);

    Contact.$inject = ['$resource', '$q', 'ToastrService', 'API_BASE_URL'];

    /* @ngInject */
    function  Contact($resource, $q, ToastrService, API_BASE_URL) {

        var resourceUrl = API_BASE_URL + '/api/contacts/:id';

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
                return data.contacts;
            }

            function getContactsError(error) {
                ToastrService.error('Impossible to retrieve Contacts','XHR Error');
                return $q.reject(error);
            }
        }

        return {
            getAll: getAll
        }
    }

})();

