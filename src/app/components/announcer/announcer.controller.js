/**
 * Created by Axel on 17/11/2016.
 */
(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .controller('AnnouncerController', AnnouncerController);

    AnnouncerController.$inject = ['DTOptionsBuilder'];

    /* @ngInject */
    function AnnouncerController(DTOptionsBuilder) {
        var vm = this;
        vm.title = 'AnnouncerController';

        activate();

        ////////////////

        function activate() {
            console.log('ANNOUNCER CONTROLLER');
        }

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
                        $(win.document.body).addClass('white-bg');
                        $(win.document.body).css('font-size', '10px');

                        $(win.document.body).find('table')
                            .addClass('compact')
                            .css('font-size', 'inherit');
                    }
                }
            ]);

        console.log(vm.dtOptions);
    }

})();



