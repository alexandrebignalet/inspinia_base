(function () {
    'use strict';

    var databases = {
        templateUrl: 'app/components/database/databases.html',
        controller: DatabaseController,
        controllerAs: 'vm'
    };

    angular
        .module('dataToolApp')
        .component('databases', databases);

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

