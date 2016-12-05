(function () {
    'use strict';

    angular
        .module('accounting.system')
        .factory('NodeSocket', NodeSocket);

    NodeSocket.$inject = ['$rootScope', 'AuthQuickbooks', 'NODE_SOCKET_BASE_URL', 'io'];

    /* @ngInject */
    function NodeSocket($rootScope, AuthQuickbooks, NODE_SOCKET_BASE_URL, io) {
        var connected = false;

        var _socket = io.connect(NODE_SOCKET_BASE_URL, {
            'reconnection': true,
            'reconnectionDelay': 1000,
            'reconnectionDelayMax' : 5000,
            'reconnectionAttempts': 1
        });

        var service = {
            isConnected: isConnected,
            on: on,
            emit: emit
        };

        on('connect', function(){
            connected = true;
            console.log('connected')
        });

        on('connect_error', function() {
            connected = false;
            AuthQuickbooks.setAvailable(false)
        });

        on('quickbooks_authentication_success', function() {
            AuthQuickbooks.setAvailable(true)
        });

        on('quickbooks_available', function() {
            AuthQuickbooks.setAvailable(true)
        });

        on('quickbooks_not_available', function() {
            AuthQuickbooks.setAvailable(false)
        });

        return service;

        ////////////////

        function isConnected () {
            return connected
        }

        function on (eventName, callback) {
            _socket.on(eventName, function() {
                var args = arguments;
                $rootScope.$apply( function() {
                    callback.apply(_socket, args);
                });
            });
        }

        function emit (eventName, data, callback) {
            _socket.emit(eventName, data, function() {
                var args = arguments;
                $rootScope.$apply( function() {
                    if (callback) {
                        callback.apply(_socket, args);
                    }
                });
            })
        }
    }

})();
