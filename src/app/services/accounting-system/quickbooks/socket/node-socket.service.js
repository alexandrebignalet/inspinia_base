(function () {
    'use strict';

    angular
        .module('accounting.system')
        .factory('NodeSocket', NodeSocket);

    NodeSocket.$inject = ['$rootScope', 'AuthQuickbooks', 'NODE_SOCKET_BASE_URL'];

    /* @ngInject */
    function NodeSocket($rootScope, AuthQuickbooks, NODE_SOCKET_BASE_URL) {
        var _connected = false,
            _socket = null;

        var service = {
            isConnected: isConnected,
            connect: connect,
            on: on,
            emit: emit
        };

        on('connect', function(){
            _connected = true;
            console.log('_connected')
        });

        on('connect_error', function() {
            _connected = false;
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
            return _connected
        }

        function connect(){
            io.connect(NODE_SOCKET_BASE_URL, {
                'reconnection': true,
                'reconnectionDelay': 1000,
                'reconnectionDelayMax' : 5000,
                'reconnectionAttempts': 1
            });
        }

        function on (eventName, callback) {
            if(!_socket){ return; }

            _socket.on(eventName, function() {
                var args = arguments;
                $rootScope.$apply( function() {
                    callback.apply(_socket, args);
                });
            });
        }

        function emit (eventName, data, callback) {
            if(!_socket){ return; }

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
