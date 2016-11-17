/**
 * Created by Axel on 17/11/2016.
 */
(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .controller('AnnouncerController', AnnouncerController);

    AnnouncerController.$inject = [];

    /* @ngInject */
    function AnnouncerController() {
        var vm = this;
        vm.title = 'AnnouncerController';

        activate();

        ////////////////

        function activate() {
            console.log('ANNOUNCER CONTROLLER');
        }
    }

})();



