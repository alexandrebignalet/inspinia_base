(function () {
    'use strict';

    var announcerShow = {
        templateUrl: 'app/components/announcer/announcer-show.html',
        controller: AnnouncerShowController,
        controllerAs: 'vm',
        bindings: {
            announcer: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('announcerShow', announcerShow);

    AnnouncerShowController.$inject = [];

    /* @ngInject */
    function AnnouncerShowController() {
        var vm = this;

        vm.$onChanges = function(obj) {
            console.log(obj);
        }

    }
})();



