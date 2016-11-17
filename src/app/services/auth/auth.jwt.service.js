(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .factory('AuthServerProvider', AuthServerProvider);

    AuthServerProvider.$inject = ['$http', '$localStorage', '$sessionStorage', 'API_BASE_URL', '$httpParamSerializerJQLike'];

    /* @ngInject */
    function AuthServerProvider($http, $localStorage, $sessionStorage, API_BASE_URL, $httpParamSerializerJQLike) {
        var service = {
            getToken: getToken,
            login: login,
            storeAuthenticationToken: storeAuthenticationToken,
            logout: logout
        };

        return service;

        ////////////////

        function getToken () {
            return $localStorage.authenticationToken || $sessionStorage.authenticationToken;
        }

        function login (credentials) {

            var data = {
                username: credentials.username,
                password: credentials.password,
                rememberMe: credentials.rememberMe
            };
            return $http({
                method: 'POST',
                url: API_BASE_URL + '/login',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: $httpParamSerializerJQLike(data)
            })
                .success(authenticateSuccess);


            function authenticateSuccess (data) {
                var jwt = data.token;
                service.storeAuthenticationToken(jwt, credentials.rememberMe);
                return jwt;
            }
        }

        function storeAuthenticationToken(jwt, rememberMe) {
            if(rememberMe){
                $localStorage.authenticationToken = jwt;
            } else {
                $sessionStorage.authenticationToken = jwt;
            }
        }

        function logout () {
            delete $localStorage.authenticationToken;
            delete $sessionStorage.authenticationToken;
        }
    }

})();

