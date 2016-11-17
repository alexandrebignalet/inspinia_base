(function () {
    'use strict';

    var topTitleBar = {
        controller: TopTitleBarController,
        controllerAs: 'vm',
        templateUrl: 'app/layouts/top-title-bar/top-title-bar.html'
    };

    angular
        .module('dataToolApp')
        .component('topTitleBar', topTitleBar);

    TopTitleBarController.$inject = ['$rootScope'];

    /* @ngInject */
    function TopTitleBarController($rootScope) {
        var vm = this;

        var stateChangeStart = $rootScope.$on('$stateChangeSuccess',  function() {
            vm.title =  $rootScope.pageTitle;
            vm.current = $rootScope.name;
        });

        $rootScope.$on('$destroy', function () {
            if(angular.isDefined(stateChangeStart) && stateChangeStart !== null){
                stateChangeStart();
            }
        });
    }

})();

