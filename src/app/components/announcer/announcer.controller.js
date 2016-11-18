/**
 * Created by Axel on 17/11/2016.
 */
(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .controller('AnnouncerController', AnnouncerController);

    AnnouncerController.$inject = ['Announcer', 'DTOptionsBuilder'];

    /* @ngInject */
    function AnnouncerController(Announcer, DTOptionsBuilder) {
        var vm = this;
        vm.title = 'AnnouncerController';

        activate();

        ////////////////

        function activate() {
            Announcer.get({
                'context': angular.toJson(['announcers_all', 'companies_all', 'contacts_summary', 'addresses_summary'])
            },onSuccess,onError);

            function onSuccess(data) {
                vm.announcers = data.announcers;

                var announcersByCountry = $filter('groupBy')(vm.announcers, 'country', 'country');
                vm.defaultIndex = objectKeyIndex(announcersByCountry, 'FR') !== -1 ? objectKeyIndex(announcersByCountry, 'FR') : 0;
            }

            function onError(error) {
                console.log(error);
            }
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
    }

})();



