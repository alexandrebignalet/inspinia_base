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
        
        ////////////////


        vm.$onInit = function () {
            console.log(vm.routers);
          
        };

   
        
    }

})();



