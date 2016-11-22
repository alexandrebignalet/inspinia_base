(function() {
    'use strict';

    angular
        .module('dataToolApp')
        .factory('Principal', Principal);

    Principal.$inject = ['$q', 'User'];

    function Principal ($q, User) {
        var _identity,
            _authenticated = false;

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
            _identity = identity;
            _authenticated = identity !== null;
        }

        function hasAnyAuthority (roles) {
            if (!_authenticated || !_identity || !_identity.roles) {
                return false;
            }

            for (var i = 0; i < roles.length; i++) {
                if (_identity.roles.indexOf(roles[i]) !== -1) {
                    return true;
                }
            }

            return false;
        }

        function hasAuthority (role) {
            if (!_authenticated) {
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
                _identity = undefined;
            }

            // check and see if we have retrieved the identity data from the server.
            // if we have, reuse it by immediately resolving
            if (angular.isDefined(_identity)) {
                deferred.resolve(_identity);

                return deferred.promise;
            }

            // retrieve the identity data from the server, update the identity object, and then resolve.
            User.current()
                .then(getUserThen)
                .catch(getUserCatch);

            return deferred.promise;

            function getUserThen (user) {
                _identity = user.data;
                _authenticated = true;
                deferred.resolve(_identity);
            }

            function getUserCatch () {
                _identity = null;
                _authenticated = false;
                deferred.resolve(_identity);
            }
        }

        function isAuthenticated () {
            return _authenticated;
        }

        function isIdentityResolved () {
            return angular.isDefined(_identity);
        }
    }
})();
