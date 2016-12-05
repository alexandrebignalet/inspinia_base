(function () {
    'use strict';

    var databaseShow = {
        templateUrl: 'app/components/database/show/database-show.html',
        controller: DatabaseShowController,
        controllerAs: 'vm',
        bindings: {
            database: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('databaseShow', databaseShow);

    DatabaseShowController.$inject = ['Database'];

    /* @ngInject */
    function DatabaseShowController(Database) {
        var vm = this;
        vm.$onInit = onInit;

        function onInit() {
            console.log(vm.database);
        }

    }

})();
