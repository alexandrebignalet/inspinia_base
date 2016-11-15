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

    sideNavigationController.$inject = [];

    /* @ngInject */
    function sideNavigationController() {
        var vm = this;
        vm.userName = "Alexandre";
    }

})();

