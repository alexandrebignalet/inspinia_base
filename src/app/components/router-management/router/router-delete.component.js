(function () {
    'use strict';

    var routerDelete = {
        templateUrl: 'app/components/router-management/router/router-delete.html',
        controller: RouterDeleteController,
        controllerAs: 'vm',
        bindings: {
            routerId: '<',
            onDeleteRouter: '&',
            isDeleting: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('routerDelete', routerDelete);

    RouterDeleteController.$inject = [];

    /* @ngInject */
    function RouterDeleteController() {
        var vm = this;

        vm.onSubmit = onSubmit;

        function onSubmit() {
            vm.onDeleteRouter({
                $event: {
                    routerId: vm.routerId
                }
            })
        }
    }


})();



