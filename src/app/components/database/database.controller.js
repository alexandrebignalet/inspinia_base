(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .controller('DatabaseController', DatabaseController);

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

