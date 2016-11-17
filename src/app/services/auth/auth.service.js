(function () {
    'use strict';

    //TODO add agency management && password reseting
    angular
        .module('dataToolApp')
        .factory('Auth', Auth);

    Auth.$inject = ['$rootScope', '$state', '$sessionStorage', '$q', 'Principal', 'AuthServerProvider'];

    /* @ngInject */
    function Auth($rootScope, $state, $sessionStorage, $q, Principal, AuthServerProvider) {
        var service = {
            authorize: authorize,
            getPreviousState: getPreviousState,
            login: login,
            logout: logout,
            resetPreviousState: resetPreviousState,
            storePreviousState: storePreviousState
        };
        return service;

        ////////////////

        function authorize (force) {
            var authReturn = Principal.identity(force).then(authThen);

            return authReturn;

            function authThen () {
                var isAuthenticated = Principal.isAuthenticated();

                // an authenticated user can't access to login and register pages
                if (isAuthenticated && ($rootScope.toState.name === 'login' || $rootScope.toState.name === 'register')) {
                    $state.go('home');
                }

                // recover and clear previousState after external login redirect (e.g. oauth2)
                if (isAuthenticated && !$rootScope.fromState.name && getPreviousState()) {
                    var previousState = getPreviousState();
                    resetPreviousState();
                    $state.go(previousState.name, previousState.params);
                }

                if ($rootScope.toState.data.authorities && $rootScope.toState.data.authorities.length > 0 && !Principal.hasAnyAuthority($rootScope.toState.data.authorities)) {
                    if (isAuthenticated) {
                        // user is signed in but not authorized for desired state
                        $state.go('accessdenied');
                    }
                    else {
                        // user is not authenticated. stow the state they wanted before you
                        // send them to the login service, so you can return them when you're done
                        storePreviousState($rootScope.toState.name, $rootScope.toStateParams);

                        // now, send them to the signin state so they can log in
                        $state.go('accessdenied').then(function() {
                            $state.go('login');
                        });
                    }
                }
            }
        }

        function login (credentials, callback) {
            var cb = callback || angular.noop;
            var deferred = $q.defer();

            AuthServerProvider.login(credentials)
                .then(loginThen)
                .catch(function (err) {
                    this.logout();
                    deferred.reject(err);
                    return cb(err);
                }.bind(this));

            function loginThen (data) {
                Principal.identity(true).then(
                    function() {
                    // // After the login the language will be changed to
                    // // the language selected by the user during his registration
                    // if (account!== null) {
                    //     $translate.use(account.langKey).then(function () {
                    //         $translate.refresh();
                    //     });
                    // }
                    deferred.resolve(data);
                });
                return cb();
            }

            return deferred.promise;
        }

        function logout () {
            AuthServerProvider.logout();
            Principal.authenticate(null);
        }

        function getPreviousState() {
            return $sessionStorage.previousState;
        }

        function resetPreviousState() {
            delete $sessionStorage.previousState;
        }

        function storePreviousState(previousStateName, previousStateParams) {
            $sessionStorage.previousState = { "name": previousStateName, "params": previousStateParams };
        }
    }

})();

