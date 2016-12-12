(function () {
    'use strict';

    var routerShow = {
        templateUrl: 'app/components/router/router-show.html',
        controller: RouterShowController,
        controllerAs: 'vm',
        bindings: {
            router: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('routerShow', routerShow);

    RouterShowController.$inject = [];

    /* @ngInject */
    function RouterShowController() {
        var vm = this;


        vm.$onChanges = function(obj) {
        }

    }
})();



