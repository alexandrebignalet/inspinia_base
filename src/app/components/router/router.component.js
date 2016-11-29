(function () {
    'use strict';

    var router = {
        templateUrl: 'app/components/router/routers.html',
        controller: RouterController,
        controllerAs: 'vm',
        bindings: {
            routers : '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('router', router);

    RouterController.$inject = [];

    /* @ngInject */
    function RouterController() {
        var vm = this;
        vm.showRouter = showRouter;

        ////////////////

        function showRouter(router) {
            vm.showedRouter = router;
        }

        vm.$onInit = function () {
            if( vm.routers.length > 0) {
                vm.showedRouter = vm.routers[0];
            }
        };



    }

})();



