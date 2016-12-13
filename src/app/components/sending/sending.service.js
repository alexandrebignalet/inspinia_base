(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .factory('Sending', Sending);

    Sending.$inject = ['$http', '$q', 'API_BASE_URL', 'ToastrService'];

    /* @ngInject */
    function Sending($http, $q, API_BASE_URL, ToastrService) {

        var service = {
            update: update
        };

        return service;

        ////////////////

        function update(sending) {
            return $http({
                method: 'PATCH',
                headers: { "Content-Type": "application/json" },
                url: API_BASE_URL + '/api/emails/' + sending.id,
                data: sending
            })
                .then(onSuccess)
                .catch(onError);
        }

        function onSuccess(response){
            return response.data;
        }

        function onError(error) {
            ToastrService.error('Impossible to update sending', 'Sending');
            return $q.reject(error)
        }
    }

})();

