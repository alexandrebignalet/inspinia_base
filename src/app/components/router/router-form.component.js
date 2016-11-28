(function () {
    'use strict';

    var routerForm = {
        templateUrl: 'app/components/router/router-form.html',
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
            
            console.log(vm.router);
            
            /*vm.onSaveRouter({
                $event: {
                    router: vm.router
                }
            });*/
        }
    }

})();
