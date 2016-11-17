(function () {
    'use strict';

    var database = {
        templateUrl: 'app/components/database/databases.html',
        controller: DatabaseController,
        controllerAs: 'vm'
    };

    angular
        .module('dataToolApp')
        .component('database', database);

    DatabaseController.$inject = [];

    /* @ngInject */
    function DatabaseController() {
        var vm = this;

        vm.title = "Databases page";
        activate();

        ////////////////

        function activate() {}
    }

})();

