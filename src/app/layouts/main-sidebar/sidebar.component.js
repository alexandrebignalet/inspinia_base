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

        vm.logout = logout;
        vm.$onInit = onInit;


        function onInit() {
            Principal.identity()
                .then(getCurrentUser);

            vm.isAuthenticated = Principal.isAuthenticated();
            vm.state = $state;

            function getCurrentUser(identity){
                vm.user = identity
            }
        }

        function logout(){
            Auth.logout();
            $state.go('login');
        }
    }
})();

