(function () {
    'use strict';

    var summary = {
        templateUrl: 'app/components/summary/summary.html',
        controller: SummaryController,
        controllerAs: 'vm',
        bindings: {

        }
    };

    angular
        .module('dataToolApp')
        .component('summary', summary);

    SummaryController.$inject = ['SummaryStat'];

    /* @ngInject */
    function SummaryController(SummaryStat) {
        var vm = this;
        vm.summaryStats = [];
        vm.stats = [];
        vm.companies = [];
        vm.dates = {};
        vm.routers = [];
        vm.filters = [];
        vm.onChangeDates = onChangeDates;
        vm.onChangeFilters = onChangeFilters;

        vm.test = function() {
            vm.filtersValue = null;
        }

        vm.$onInit = function(){

        };



        function formatStats(stats) {
            angular.forEach(stats, function(stat) {
                stat = formatStat(stat);
                addRouter(stat);
            });

            return stats;
        }

        function addRouter(stat){
            var indexRouter = indexOfArrayObject(stat.router_id, vm.routers, 'id');
            if( indexRouter == -1 ){

                var router = {
                    id: stat.router_id,
                    name: stat.router_name,
                    sentVolume: stat.real.volume,
                    income: 0,
                    margin: 0,
                    cpmCost: 0,
                    cost: 0,
                    stats: [stat]
                };

                vm.routers.push(router);

            } else {
                vm.routers[indexRouter].stats.push(stat);
                vm.routers[indexRouter].sentVolume += stat.real.volume;
            }
        }

        function formatStat(stat) {
            stat.real = {
                volume: +stat.total_sent,
                income: ( stat.total_incomes ? +stat.total_incomes : 0 ),
                cost: 0,
                cpmCost: 0,
                margin: 0,
                ecpm:  +stat.total_incomes / +stat.total_sent * 1000
            };

            stat.estimate = {
                volume: (stat.real.volume / vm.dates.selectedDays) * vm.dates.lastDay,
                income: (stat.real.income / vm.dates.selectedDays) * vm.dates.lastDay,
                cost: 0,
                margin: 0
            };

            return stat;
        }

        function onChangeFilters($event) {
            console.log($event);
            vm.filtersValue = $event.filters;
        }

        function onChangeDates($event) {

            var dates = $event.dates;

            vm.dates = {
                startDate: dates.startDate,
                endDate: dates.endDate,
                selectedDays: getSelectedDays(dates.startDate,dates.endDate),
                lastDay: dates.endDate.endOf("month").format('DD')
            };

            SummaryStat.getSummaryStats(dates.startDate, dates.endDate)
                .then(onSuccess)
                .catch(onError);

            function onSuccess(response) {
                var stats = response.data;
                vm.stats = formatStats(stats);
            }

            function onError(error) {
                console.log(error);
            }
        }

        function getSelectedDays(startDate,endDate) {

            return endDate.diff(startDate,'days');

        }

        function indexOfArrayObject(value,array,field) {
            for( var res = 0 ; res < array.length ; res++ ) {
                if (array[res][field] == value) { return res }
            }
            return -1;
        }
    }

})();

