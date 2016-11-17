(function () {
    'use strict';

    var login = {
        templateUrl: 'app/login/login.html',
        controller: LoginController,
        controllerAs: 'vm'
    };

    angular
        .module('dataToolApp')
        .component('login', login);

    LoginController.$inject = ['$rootScope', '$state', '$timeout', 'Auth', 'ToastrService'];

    /* @ngInject */
    function LoginController($rootScope, $state, $timeout, Auth, ToastrService) {
        var vm = this;

        vm.credentials = {};
        vm.login = login;
        vm.password = null;
        vm.rememberMe = true;
        vm.username = null;

        $timeout(function (){angular.element('#username').focus();});

        function login (event) {
            event.preventDefault();
            Auth.login({
                username: vm.username,
                password: vm.password,
                rememberMe: vm.rememberMe
            }).then(function () {
                ToastrService.success('You are now connected to DataTool.', 'Connection successful');
                if ($state.current.name === 'register') {
                    $state.go('home');
                }

                $rootScope.$broadcast('authenticationSuccess');

                // previousState was set in the authExpiredInterceptor before being redirected to login modal.
                // since login is succesful, go to stored previousState and clear previousState
                if (Auth.getPreviousState()) {
                    var previousState = Auth.getPreviousState();
                    Auth.resetPreviousState();
                    $state.go(previousState.name, previousState.params);
                } else {
                    $state.go('home');
                }
            }).catch(function () {
                ToastrService.error('Bad credentials.', 'Login failed')
            });
        }
    }
})();

