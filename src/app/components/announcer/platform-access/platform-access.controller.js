/**
 * Created by Axel on 18/11/2016.
 */
(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .controller('PlatformAccess', PlatformAccess);

    PlatformAccess.$inject = [];

    /* @ngInject */
    function PlatformAccess() {
        var vm = this;
        vm.title = 'PlatformAccess';

        activate();

        ////////////////

        function activate() {
            console.log('PLATFORM ACCESS');
        }
    }

})();

