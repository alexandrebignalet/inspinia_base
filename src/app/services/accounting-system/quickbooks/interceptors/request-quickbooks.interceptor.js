(function() {
    'use strict';

    angular
        .module('accounting.system')
        .factory('quickBooksInterceptor', quickBooksInterceptor);

    quickBooksInterceptor.$inject = ['NODE_API_BASE_URL', 'NodeSocket', 'AuthQuickbooks', '$q'];

    function quickBooksInterceptor (NODE_API_BASE_URL, NodeSocket, AuthQuickbooks, $q) {

        var service = {
            request: request
        };

        return service;

        //////////////////////////

        function request (config) {

            if ( !config.url.includes(NODE_API_BASE_URL) ){
                return config;
            }

            if (!NodeSocket.isConnected()) {
                var response = {
                    status: 0,
                    data: 'You must switch on Node Server.',
                    config: {url: config.url}
                };

                return $q.reject(response)
            }

           // config.headers = AuthQuickbooks.getHeaders();

            if ( config.url.includes(NODE_API_BASE_URL) && !AuthQuickbooks.isAvailable() ) {
                if (config.method !== 'GET') { config.method = 'GET' }
                config.url = NODE_API_BASE_URL+'/quickbooks/auth/requestToken'
            }


            return config;
        }
    }
})();
