(function() {
    'use strict';

    angular
        .module('dataToolApp')
        .factory('Principal', Principal);

    Principal.$inject = ['$q', 'User'];

    function Principal ($q, User) {
        var that = this;

        that.authenticated = false;

        var service = {
            authenticate: authenticate,
            hasAnyAuthority: hasAnyAuthority,
            hasAuthority: hasAuthority,
            identity: identity,
            isAuthenticated: isAuthenticated,
            isIdentityResolved: isIdentityResolved
        };

        return service;

        function authenticate (identity) {
            that.identity = identity;
            that.authenticated = identity !== null;
        }

        function hasAnyAuthority (roles) {
            if (!that.authenticated || !that.identity || !that.identity.roles) {
                return false;
            }

            for (var i = 0; i < roles.length; i++) {
                if (that.identity.roles.indexOf(roles[i]) !== -1) {
                    return true;
                }
            }

            return false;
        }

        function hasAuthority (role) {
            if (!that.authenticated) {
                return $q.when(false);
            }

            return this.identity().then(function(_id) {
                return _id.roles && _id.roles.indexOf(role) !== -1;
            }, function(){
                return false;
            });
        }

        function identity (force) {
            var deferred = $q.defer();

            if (force === true) {
                that.identity = undefined;
            }

            // check and see if we have retrieved the identity data from the server.
            // if we have, reuse it by immediately resolving
            if (angular.isDefined(that.identity)) {
                deferred.resolve(that.identity);

                return deferred.promise;
            }

            // retrieve the identity data from the server, update the identity object, and then resolve.
            User.current()
                .then(getUserThen)
                .catch(getUserCatch);

            return deferred.promise;

            function getUserThen (user) {
                that.identity = user;
                that.authenticated = true;
                deferred.resolve(that.identity);
            }

            function getUserCatch () {
                that.identity = null;
                that.authenticated = false;
                deferred.resolve(that.identity);
            }
        }

        function isAuthenticated () {
            return that.authenticated;
        }

        function isIdentityResolved () {
            return angular.isDefined(that.identity);
        }
    }
})();
