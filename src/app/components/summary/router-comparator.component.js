(function () {
    'use strict';

    var routerComparator = {
        templateUrl: 'app/components/summary/router-comparator.html',
        controller: RouterComparatorController,
        controllerAs: 'vm',
        bindings: {
            routers: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('routerComparator', routerComparator);

    RouterComparatorController.$inject = [];

    /* @ngInject */
    function RouterComparatorController() {
        var vm = this;

        vm.$onInit = function() {
            console.log(vm.routers);
        }
    }

})();

