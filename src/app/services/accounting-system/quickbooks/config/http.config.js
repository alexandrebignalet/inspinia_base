(function() {
    'use strict';

    angular
        .module('accounting.system')
        .config(httpConfig);

    httpConfig.$inject = ['$httpProvider'];

    function httpConfig($httpProvider) {
        $httpProvider.interceptors.push('quickBooksInterceptor');
        $httpProvider.interceptors.push('quickBooksErrorHandlerInterceptor');
    }
})();
