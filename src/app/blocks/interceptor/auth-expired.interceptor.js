(function() {
    'use strict';

    angular
        .module('dataToolApp')
        .factory('authExpiredInterceptor', authExpiredInterceptor);


    authExpiredInterceptor.$inject = ['$q', '$injector', '$localStorage', '$sessionStorage', 'NODE_API_BASE_URL'];

    function authExpiredInterceptor($q, $injector, $localStorage, $sessionStorage, NODE_API_BASE_URL) {
        var service = {
            responseError: responseError
        };

        return service;

        function responseError(response) {
            if (response.status === 401 && !response["config"].url.includes(NODE_API_BASE_URL)) {
                delete $localStorage.authenticationToken;
                delete $sessionStorage.authenticationToken;
                var Principal = $injector.get('Principal');
                if (Principal.isAuthenticated()) {
                    var Auth = $injector.get('Auth');
                    Auth.authorize(true);
                }
            }

            return $q.reject(response);
        }
    }
})();
