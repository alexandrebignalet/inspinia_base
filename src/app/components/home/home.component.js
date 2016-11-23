(function () {
    'use strict';

    var home = {
        templateUrl: 'app/components/home/home.html',
        controller: HomeController,
        controllerAs: 'vm'
    };

    angular
        .module('dataToolApp')
        .component('home', home);

    HomeController.$inject = ['Database'];

    /* @ngInject */
    function HomeController(Database) {
        var vm = this;

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

        vm.sortableOptions = {
            items: "> *",
            connectWith: ".connectPanels",
            handler: ".ibox-title"
        };
    }
})();

