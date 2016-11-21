(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .factory('CountriesProvider', CountriesProvider);

    CountriesProvider.$inject = ['$http', '$q', '$ocLazyLoad'];

    /* @ngInject */
    function CountriesProvider($http, $q, $ocLazyLoad) {

        var service = {
            'get': get
        };

        return service;

        function get(){
            var file = $ocLazyLoad.load([
                {
                    files: ['src/assets/world-countries.json']
                }
            ])
            console.log(file)
            return file;
        }
    }

})();

