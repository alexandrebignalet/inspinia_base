/**
 * Created by Axel on 18/11/2016.
 */
/**
 * Created by Axel on 17/11/2016.
 */
(function () {
    'use strict';

    var announcer = {
        templateUrl: 'app/components/announcer/announcers.html',
        controller: AnnouncerController,
        controllerAs: 'vm',
        bindings: {
            announcers : '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('announcer', announcer);

    AnnouncerController.$inject = ['DTOptionsBuilder'];

    /* @ngInject */
    function AnnouncerController(DTOptionsBuilder) {
        var vm = this;
        vm.title = 'AnnouncerController';

        ////////////////

        vm.dtOptions = DTOptionsBuilder.newOptions()
            .withDOM('<"html5buttons"B>lfrtip')
            .withBootstrap()
            .withButtons([
                {extend: 'copy'},
                {extend: 'csv'},
                {extend: 'excel', title: 'ExampleFile'},
                {extend: 'pdf', title: 'ExampleFile'},
                {extend: 'print',
                    customize: function (win){
                        angular.element(win.document.body).addClass('white-bg');
                        angular.element(win.document.body).css('font-size', '10px');

                        angular.element(win.document.body).find('table')
                            .addClass('compact')
                            .css('font-size', 'inherit');
                    }
                }
            ]);
    }

})();



