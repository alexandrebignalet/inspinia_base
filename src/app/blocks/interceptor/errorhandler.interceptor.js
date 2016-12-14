(function() {
    'use strict';

    angular
        .module('dataToolApp')
        .factory('errorHandlerInterceptor', errorHandlerInterceptor);

    errorHandlerInterceptor.$inject = ['$q', '$rootScope'];

    function errorHandlerInterceptor ($q, $rootScope) {
        var service = {
            responseError: responseError
        };

        return service;

        function responseError (response) {
            // if (!(response.status === 401 && (response.data === '' || (response.config.url && response.config.url.includes('/api/users/current') === 0 )))) {
            //     $rootScope.$emit('dataToolApp.httpError', response);
            // }
            return $q.reject(response);
        }
    }
})();
