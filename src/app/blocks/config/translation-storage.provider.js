/**
 * Created by Axel on 16/11/2016.
 */
(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .factory('translationStorageProvider', translationStorageProvider);

    translationStorageProvider.$inject = ['$cookies', '$log', 'LANGUAGES'];

    /* @ngInject */
    function translationStorageProvider($cookies, $log, LANGUAGES) {
        return {
            get: get,
            put: put
        };

        function get(name) {
            if (LANGUAGES.indexOf($cookies.getObject(name)) === -1) {
                $log.info('Resetting invalid cookie language "' + $cookies.getObject(name) + '" to prefered language "en"');
                $cookies.putObject(name, 'en');
            }
            return $cookies.getObject(name);
        }

        function put(name, value) {
            $cookies.putObject(name, value);
        }
    }

})();

