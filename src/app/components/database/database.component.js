(function () {
    'use strict';

    var databases = {
        templateUrl: 'app/components/database/databases.html',
        controller: DatabaseController,
        controllerAs: 'vm',
        bindings: {
            databases: '='
        }
    };

    angular
        .module('dataToolApp')
        .component('databases', databases);

    DatabaseController.$inject = [];

    /* @ngInject */
    function DatabaseController() {
        var vm = this;

    }

})();

