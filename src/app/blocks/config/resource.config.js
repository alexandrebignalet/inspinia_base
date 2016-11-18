(function() {
    'use strict';

    angular
        .module('dataToolApp')
        .config(resourceConfig);

    resourceConfig.$inject = ['$resourceProvider'];

    function resourceConfig($resourceProvider) {

        /**
         * If trailing slashes aren't enable, browsers will block all requested by CORS policy.
         * This enabled allows to let the / at the end of a request url
         *
         * without: http://datatool.web/api/users
         *
         * with: http://datatool.web/api/users/
         */
        $resourceProvider.defaults.stripTrailingSlashes = false;
    }
})();
