(function () {
    'use strict';

    var databaseForm = {
        templateUrl: 'app/components/database/crud/database-form.html',
        controller: DatabaseFormController,
        controllerAs: 'vm',
        bindings: {
            database: '<',
            onSave: '&',
            isSaving: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('databaseForm', databaseForm);

    DatabaseFormController.$inject = ['$timeout', 'COUNTRIES'];

    /* @ngInject */
    function DatabaseFormController($timeout, COUNTRIES) {
        var vm = this;

        vm.onSubmit = onSubmit;


        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        vm.$onInit = function (){
            vm.countries = COUNTRIES;
        };

        vm.$onChanges = function(changes) {
            if (changes.database) {
                vm.database = Object.assign({}, vm.database);
            }
        };

        function onSubmit(){
            vm.onSave({
                $event: {
                    database: vm.database
                }
            });
        }
    }

})();



