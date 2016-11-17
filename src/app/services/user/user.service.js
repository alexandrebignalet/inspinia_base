(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .factory('User', User);

    User.$inject = ['$resource', '$http','API_BASE_URL'];

    function User ($resource, $http, API_BASE_URL) {
        var service = {
            resource: resource,
            current: current
        };

        function resource() {

            return $resource( API_BASE_URL + '/api/users/:id', {}, {
                'query': {method: 'GET', isArray: true},
                'get': {
                    method: 'GET',
                    transformResponse: function (data) {
                        data = angular.fromJson(data);
                        return data;
                    }
                },
                'save': { method:'POST' },
                'update': { method:'PUT' },
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
