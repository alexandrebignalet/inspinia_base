(function() {
    'use strict';

    angular
        .module('accounting.system')
        .factory('QuickBooksErrorHandlerInterceptor', QuickBooksErrorHandlerInterceptor);

    QuickBooksErrorHandlerInterceptor.$inject = ['$q', 'AuthQuickbooks', 'ToastrService', '$window'];

    function QuickBooksErrorHandlerInterceptor ($q, AuthQuickbooks, ToastrService, $window) {

        var service = {
            response: needAuthentification,
            responseError: responseError
        };

        return service;

        //////////////////////////

        function needAuthentification (response) {

            if ( response.config.url.includes('/auth') && !AuthQuickbooks.isAvailable()) {
                $window.open(response.data);
                return $q.reject(response)
            }

            return response;
        }

        function responseError (response) {

            switch (response.status) {
                case 401:
                    AuthQuickbooks.setAvailable(false);
                    ToastrService.warning('Not available', 'Quickbooks');
                    break;
                case 400:
                    ToastrService.warning('Validation Error', 'Quickbooks');
                    break;
                case 404:
                    ToastrService.warning(response.status +': '+response.statusText, 'Quickbooks');
                    break;
                default:
                    ToastrService.warning('Unregistered Error', 'Quickbooks');
                    break;
            }

            return $q.reject(response)
        }
    }
})();
