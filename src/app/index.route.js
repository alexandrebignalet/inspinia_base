(function() {
    'use strict';

    angular
        .module('dataToolApp')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('index', {
                abstract: true,
                url: "/index",
                templateUrl: "app/components/common/content.html"
            })
            .state('index.main', {
                url: "/main",
                templateUrl: "app/main/main.html",
                data: { pageTitle: 'Example view' }
            })
            .state('index.minor', {
                url: "/minor",
                templateUrl: "app/minor/home.html",
                data: { pageTitle: 'Example view' }
            })
            .state('index.home', {
                url: "/home",
                templateUrl: "app/components/home.html",
                controller: "HomeController",
                controllerAs: "vm",
                data: { pageTitle: 'Test view' }
            });

        $urlRouterProvider.otherwise('/index/home');
    }

})();
