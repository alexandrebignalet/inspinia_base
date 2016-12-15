(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .factory('User', User);

    User.$inject = ['$resource', 'ToastrService','API_BASE_URL', '$q'];

    function User ($resource, ToastrService, API_BASE_URL, $q) {
        var resourceUrl = API_BASE_URL + '/api/users/:id';

        var resource = $resource( resourceUrl, {}, {
            save: { method: 'POST'},
            patch: { method: 'PATCH'},
            delete: { method: 'DELETE'},
            current: { method: 'GET', url: API_BASE_URL + '/api/users/current' }
        });

        var service = {
            get: get,
            getAll: getAll,
            current: current
        };

        return service;

        ////////////////


        function current(){

            return resource.current()
                .$promise
                .then(onSuccess)

        }

        function get(id, context){
            return resource.get({ id: id, context: angular.toJson(context) })
                .$promise
                .then(onSuccess)
                .catch(onError);

            function onError(error){
                ToastrService.error('Impossible to get User', 'DataEngine');
                return $q.reject(error)
            }
        }

        function getAll(context){
            return resource.query({ context: angular.toJson(context) })
                .$promise
                .then(onSuccess)
                .catch(onError);

            function onError(error){
                ToastrService.error('Impossible to get all Users', 'DataEngine');
                return $q.reject(error)
            }
        }

        function onSuccess(data) {
            return data
        }
    }
})();
