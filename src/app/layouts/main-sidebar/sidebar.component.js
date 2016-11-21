(function () {
    'use strict';

    var sideNavigation = {
        templateUrl: 'app/layouts/main-sidebar/navigation.html',
        controller: sideNavigationController,
        controllerAs: 'vm'
    };

    angular
        .module('dataToolApp')
        .component('sideNavigation', sideNavigation);

    sideNavigationController.$inject = ['Principal', 'Auth', '$state'];

    /* @ngInject */
    function sideNavigationController(Principal, Auth, $state) {
        var vm = this;

        vm.isAuthenticated = Principal.isAuthenticated();
        vm.logout = logout;
        vm.state = $state;


        Principal.identity(true)
            .then(getCurrentUser);

        function getCurrentUser(identity){
            vm.user = identity
        }

        function logout(){
            Auth.logout();
            $state.go('login');
        }
    }
})();

