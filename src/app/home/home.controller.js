(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .controller('HomeController', HomeController);

        HomeController.$inject = [];

        /* @ngInject */
        function HomeController() {
            var vm = this;

            activate();

            vm.chart = {};

            vm.chart.piechart = {
                data: [300, 500, 100],
                labels: ["Download Sales", "In-Store Sales", "Mail-Order Sales"],
                options: {}
            };

            vm.charte = {
                data: [
                    [65, 59, 80, 81, 56, 55, 40],
                    [28, 48, 40, 19, 86, 27, 90]
                ],
                series: ['Series A', 'Series B'],
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                options: {}
            };

            ////////////////

            function activate() {

            }

            /**
             *
             * @type {{items: string, connectWith: string, handler: string}}
             */
            vm.sortableOptions = {
                items: "> *",
                connectWith: ".connectPanels",
                handler: ".ibox-title"
            };
        }

})();

