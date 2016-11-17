(function() {
    'use strict';

    angular
        .module('dataToolApp')
        .config(localStorageConfig);

    localStorageConfig.$inject = ['$localStorageProvider', '$sessionStorageProvider'];

    function localStorageConfig($localStorageProvider, $sessionStorageProvider) {
        $localStorageProvider.setKeyPrefix('datatool-');
        $sessionStorageProvider.setKeyPrefix('datatool-');
    }
})();
