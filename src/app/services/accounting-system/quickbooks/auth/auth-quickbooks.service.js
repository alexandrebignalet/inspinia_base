(function () {
    'use strict';

    angular
        .module('accounting.system')
        .factory('AuthQuickbooks', AuthQuickbooks);

    AuthQuickbooks.$inject = [];

    /* @ngInject */
    function AuthQuickbooks() {
        var _authInfo;
        var _available = false;

        var service = {
            setAuthInfo: setAuthInfo,
            hasAuthInfo: hasAuthInfo,
            getHeaders: getHeaders,
            isAvailable: isAvailable,
            setAvailable: setAvailable
        };

        return service;

        ////////////////

        function isAvailable () {
            return _available
        }

        function setAvailable (bool) {
            _available = bool
        }

        function setAuthInfo (consumerKey, consumerSecret){
            _authInfo = { consumerKey: consumerKey, consumerSecret: consumerSecret }
        }

        function hasAuthInfo () {
            return angular.isDefined(_authInfo)
        }

        function getHeaders () {
            return {
                "Accept": "application/json",
                "consumer-key": _authInfo.consumerKey,
                "consumer-secret": _authInfo.consumerSecret
            }
        }
    }

})();

