(function() {
    'use strict';

    angular
        .module('accounting.system')
        .factory('quickBooksErrorHandlerInterceptor', quickBooksErrorHandlerInterceptor);

    quickBooksErrorHandlerInterceptor.$inject = ['$q', 'AuthQuickbooks', 'ToastrService'];

    function quickBooksErrorHandlerInterceptor ($q, AuthQuickbooks, ToastrService) {

        var service = {
            responseError: responseError
        };

        return service;

        //////////////////////////

        function responseError (response) {

            switch (response.status) {
                case 401:
                    AuthQuickbooks.setAvailable(false);
                    ToastrService.warning('Not available', 'Quickbooks');
                    break;
                case 400:
                    ToastrService.warning('Validation Error', 'Quickbooks');
                    break;
                default:
                    ToastrService.warning('Unregistered Error', 'Quickbooks');
                    break;
            }

            return $q.reject(response)
        }
    }
})();
