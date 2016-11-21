/**
 * Created by Axel on 18/11/2016.
 */
(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .controller('PlatformAccessController', PlatformAccessController);

    PlatformAccessController.$inject = [];

    /* @ngInject */
    function PlatformAccessController() {
        var vm = this;
        vm.title = 'PlatformAccess';

        activate();

        ////////////////

        function activate() {
        }
    }

})();

