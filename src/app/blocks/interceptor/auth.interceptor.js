(function() {
    'use strict';

    angular
        .module('dataToolApp')
        .factory('authInterceptor', authInterceptor);

    authInterceptor.$inject = ['$localStorage', '$sessionStorage'];

    function authInterceptor ($localStorage, $sessionStorage) {
        var service = {
            request: request
        };

        return service;

        function request (config) {

            /*jshint camelcase: false */
            config.headers = config.headers || {};
            var token = $localStorage.authenticationToken || $sessionStorage.authenticationToken;

            if (token) {
                config.headers.Authorization = 'Bearer ' + token;
            }

            return config;
        }
    }
})();
