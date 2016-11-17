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

    sideNavigationController.$inject = ['Principal'];

    /* @ngInject */
    function sideNavigationController(Principal) {
        var vm = this;

        vm.isAuthenticated = Principal.isAuthenticated();

        if (vm.isAuthenticated){
            vm.user = Principal.identity();
        }
    }
})();

