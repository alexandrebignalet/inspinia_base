(function () {
    'use strict';

    angular
        .module('accounting.system')
        .factory('AuthQuickbooks', AuthQuickbooks);

    AuthQuickbooks.$inject = ['NodeSocket', 'ToastrService'];

    /* @ngInject */
    function AuthQuickbooks(NodeSocket, ToastrService) {
        var _authInfo;
        var _available = false;

        var service = {
            setAuthInfo: setAuthInfo,
            hasAuthInfo: hasAuthInfo,
            getHeaders: getHeaders,
            isAvailable: isAvailable,
            setAvailable: setAvailable
        };

        NodeSocket.on('quickbooks_not_available', function() {
            ToastrService.success('Not available', 'Quickbooks');
            setAvailable(false)
        });

        NodeSocket.on('connect_error', function() {
            setAvailable(false)
        });

        NodeSocket.on('quickbooks_authentication_success', function() {
            setAvailable(true)
        });

        NodeSocket.on('quickbooks_available', function() {
            ToastrService.success('You can use Quickbooks', 'Quickbooks');
            setAvailable(true)
        });

        NodeSocket.on('quickbooks_not_available', function() {
            setAvailable(false);
        });

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
                "Content-Type": "application/json",
                "consumer-key": _authInfo.consumerKey,
                "consumer-secret": _authInfo.consumerSecret
            }
        }
    }

})();

