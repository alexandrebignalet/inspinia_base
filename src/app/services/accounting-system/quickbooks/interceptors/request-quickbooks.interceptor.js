(function() {
    'use strict';

    angular
        .module('accounting.system')
        .factory('quickBooksInterceptor', quickBooksInterceptor);

    quickBooksInterceptor.$inject = ['NODE_API_BASE_URL', 'NodeSocket', 'AuthQuickbooks', '$q', '$window'];

    function quickBooksInterceptor (NODE_API_BASE_URL, NodeSocket, AuthQuickbooks, $q, $window) {

        var service = {
            request: request,
            response: response
        };

        return service;

        //////////////////////////

        function request (config) {
            var response = null;

            if ( !config.url.includes(NODE_API_BASE_URL) ){
                return config;
            }

            if (!NodeSocket.isConnected()) {
                response = {
                    status: 0,
                    data: 'You must switch on Node Server.',
                    config: {url: config.url}
                };

                return $q.reject(response)
            }

            if ( !AuthQuickbooks.hasAuthInfo() ) {
                response = {
                    status: 0,
                    data: 'Set credentials before using api.',
                    config: {url: config.url}
                };
                return $q.reject(response)
            }

            config.headers = AuthQuickbooks.getHeaders();

            if ( !AuthQuickbooks.isAvailable() ) {
                if (config.method !== 'GET') { config.method = 'GET' }
                config.url = NODE_API_BASE_URL+'/quickbooks/auth/requestToken'
            }

            return config;
        }

        function response (response) {

            if (!response.config){
                return response
            }

            if ( !response.config.url.includes(NODE_API_BASE_URL) || AuthQuickbooks.isAvailable()) {
                return response
            }

            if ( response.config.url.includes('/auth') ) {
                $window.open(response.data);
                return $q.reject(response)
            }
        }
    }
})();
