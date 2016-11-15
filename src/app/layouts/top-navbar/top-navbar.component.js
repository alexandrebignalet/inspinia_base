(function() {
    'use strict';

    var topNavbar = {
        templateUrl: 'app/layouts/top-navbar/top-navbar.html',
        controller: topNavbarController,
        controllerAs: 'vm'
    };

    angular
        .module('dataToolApp')
        .component('topNavbar', topNavbar);

    topNavbarController.$inject = ['$timeout'];

    function topNavbarController($timeout) {
        var vm = this;

        vm.minimalize = minimalize;

        function minimalize() {
            angular.element('body').toggleClass('mini-navbar');
            if (!angular.element('body').hasClass('mini-navbar') || angular.element('body').hasClass('body-small')) {
                // Hide menu in order to smoothly turn on when maximize menu
                angular.element('#side-menu').hide();
                // For smoothly turn on menu
                $timeout(function () {
                    angular.element('#side-menu').fadeIn(400);
                }, 200);
            } else {
                // Remove all inline style from jquery fadeIn function to reset menu state
                angular.element('#side-menu').removeAttr('style');
            }
        }
    }
})();
