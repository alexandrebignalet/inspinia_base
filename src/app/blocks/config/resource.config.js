/**
 * Created by Axel on 18/11/2016.
 */
(function() {
    'use strict';

    angular
        .module('dataToolApp')
        .config(resourceConfig);

    resourceConfig.$inject = ['$resourceProvider'];

    function resourceConfig($resourceProvider) {
        $resourceProvider.defaults.stripTrailingSlashes = false;
    }
})();
