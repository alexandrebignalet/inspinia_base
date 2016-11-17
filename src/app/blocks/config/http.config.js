(function() {
    'use strict';

    angular
        .module('dataToolApp')
        .config(httpConfig);

    httpConfig.$inject = ['$urlRouterProvider', '$httpProvider'];

    function httpConfig($urlRouterProvider, $httpProvider) {

        $urlRouterProvider.otherwise('/');

        $httpProvider.interceptors.push('errorHandlerInterceptor');
        $httpProvider.interceptors.push('authExpiredInterceptor');
        $httpProvider.interceptors.push('authInterceptor');
    }
})();
