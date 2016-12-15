(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .factory('NodeSocket', NodeSocket);

    NodeSocket.$inject = ['$rootScope', 'NODE_SOCKET_BASE_URL'];

    /* @ngInject */
    function NodeSocket($rootScope, NODE_SOCKET_BASE_URL) {
        var that = this;

        that.connected = false;
        that.watches = {};
        that.options = {
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: 1
        };

        that.socket = io(NODE_SOCKET_BASE_URL, that.options);

        var service = {
            isConnected: isConnected,
            connect: connect,
            disconnect: disconnect,
            on: on,
            emit: emit,
            watch: watch
        };

        on('connect', function(){
            that.connected = true;
        });

        on('connect_error', function() {
            that.connected = false
        });

        on('disconnect', function(){
            that.connected = false
        });

        return service;

        ////////////////

        function isConnected () {
            return that.connected
        }

        function disconnect(){
            that.connected = false;
        }

        function connect(){
            that.socket.connect();
        }

        function on (eventName, callback) {
            if(!that.socket){ return; }

            that.socket.on(eventName, function() {
                var args = arguments;
                $rootScope.$apply( function() {
                    callback.apply(that.socket, args);
                });
            });
        }

        function emit (eventName, data, callback) {
            if(!that.socket){ return; }

            that.socket.emit(eventName, data, function() {
                var args = arguments;
                $rootScope.$apply( function() {
                    if (callback) {
                        callback.apply(that.socket, args);
                    }
                });
            })
        }

        function watch(item, closure) {
            watches[item] = closure;
        }
    }

})();
