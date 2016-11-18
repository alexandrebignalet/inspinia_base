(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .factory('User', User);

    User.$inject = ['$resource', '$http','API_BASE_URL'];

    function User ($resource, $http, API_BASE_URL) {
        var resourceUrl = API_BASE_URL + '/api/users/:id';

        var service = {
            resource: resource,
            current: current
        };

        function resource() {

            return $resource( resourceUrl, {}, {
                'save': { method:'POST'},
                'patch': { method:'PATCH'},
                'delete':{ method:'DELETE'}
            });
        }

        function current(){
            return $http({
                method: 'GET',
                url: API_BASE_URL + '/api/users/current'
            })
                .success(currentGetThen);

            function currentGetThen(response) {
                return response.data;
            }
        }

        return service;
    }
})();
