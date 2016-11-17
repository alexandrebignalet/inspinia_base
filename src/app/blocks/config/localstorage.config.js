/**
 * Created by Axel on 16/11/2016.
 */
(function() {
    'use strict';

    angular
        .module('dataToolApp')
        .config(localStorageConfig);

    localStorageConfig.$inject = ['$localStorageProvider', '$sessionStorageProvider'];

    function localStorageConfig($localStorageProvider, $sessionStorageProvider) {
        $localStorageProvider.setKeyPrefix('dt-');
        $sessionStorageProvider.setKeyPrefix('dt-');
    }
})();
