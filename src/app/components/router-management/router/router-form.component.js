(function () {
    'use strict';

    var routerForm = {
        templateUrl: 'app/components/router-management/router/router-form.html',
        controller: RouterFormController,
        controllerAs: 'vm',
        bindings: {
            router: '<',
            onSaveRouter: '&',
            isSaving: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('routerForm', routerForm);

    RouterFormController.$inject = ['COUNTRIES'];

    /* @ngInject */
    function RouterFormController(COUNTRIES) {
        var vm = this;
        vm.onSubmit = onSubmit;

        vm.$onInit = function() {
            vm.countries = COUNTRIES;
        };

        function onSubmit() {
            vm.onSaveRouter({
                $event: {
                    router: vm.router
                }
            });
        }
    }

})();
