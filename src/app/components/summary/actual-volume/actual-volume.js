(function () {
    'use strict';

    var actualVolume = {
        templateUrl: 'app/components/summary/actual-volume/actual-volume.html',
        controller: ActualVolumeController,
        controllerAs: 'vm',
        bindings: {
        }
    };

    angular
        .module('dataToolApp')
        .component('actualVolume', actualVolume);

    ActualVolumeController.$inject = ['ActualVolume','$filter'];

    /* @ngInject */
    function ActualVolumeController(ActualVolume,$filter) {
        var vm = this;
        vm.dates = {};
        vm.stats = [];       // RECEIVED DATA
        vm.statsFiltered = [];       // RECEIVED DATA
        vm.databases = [];   // TAB DATA
        vm.databasesFiltered = [];   // TAB DATA
        vm.test = [];
        vm.totals = {
            actualVolume: 0,
            daybeforeVolume: 0,
            predictActualVolume: 0,
            predictDaybeforeVolume: 0,
            predictCombined: 0
        };
        vm.chartVolumeObject = {
            labels: [],
            data: [],
            series: ['Volumes','Average']
        };
        vm.chartTotalsObject = {
            labels: [],
            data: [],
            series: ['TotalsAvg','TotalsDayBefore']
        };

        vm.onChangeFilters = onChangeFilters;
        vm.onChangeDates = onChangeDates;
        vm.$onInit = onInit;

        /////////////////////////////////////////////

        function onInit(){
            vm.filtersContent = {};
        }

        function onChangeDates($event)
        {
            var dates = $event.dates;

            vm.dates = {
                startDate: dates.startDate,
                endDate: dates.endDate,
                endDateDay: dates.endDate.format('DD')
            };

            ActualVolume.getSummaryVolumes(dates.startDate, dates.endDate)
                .then(onSuccess)
                .catch(onError);

            function onSuccess(response){

                vm.stats = response.data;
                vm.stats.sort(function(a,b){
                    var dateA = moment(a.date.date);
                    var dateB = moment(b.date.date);

                    return dateA - dateB;
                });

                vm.filtersContent = ActualVolume.parseResponse(vm.stats,vm.databases);
                ActualVolume.getProcessedValues(vm.databases,vm.totals, vm.dates.endDateDay);
                ActualVolume.getGraphsObject(vm.stats, vm.chartVolumeObject, vm.chartTotalsObject);

                vm.statsFiltered     = vm.stats;
                vm.databasesFiltered = vm.databases;
            }

            function onError(error) {
                console.log(error);
            }
        }

        function onChangeFilters($event) {
            vm.filtersValue = $event.filters;
            updateComponents();
        }

        function updateComponents(){

            updateFilteredData();
            resetObjects();

            ActualVolume.getGraphsObject(vm.statsFiltered, vm.chartVolumeObject, vm.chartTotalsObject);
            ActualVolume.getProcessedValues(vm.databasesFiltered,vm.totals, vm.dates.endDateDay);
        }

        function resetObjects() {
            vm.totals = {
                actualVolume: 0,
                daybeforeVolume: 0,
                predictActualVolume: 0,
                predictDaybeforeVolume: 0,
                predictCombined: 0
            };
            vm.chartVolumeObject = {
                labels: [],
                data: [],
                series: ['Volumes','Average']
            };
            vm.chartTotalsObject = {
                labels: [],
                data: [],
                series: ['TotalsAvg','TotalsDayBefore']
            };
        }

        function updateFilteredData() {
            var filteredDatabases = $filter('propsOnArrayFilterJs')(vm.databases,'id',vm.filtersValue.selectedDatabases,'id');
            var filteredStats = $filter('propsOnArrayFilterJs')(vm.stats,'database_id',vm.filtersValue.selectedDatabases,'id');
            vm.databasesFiltered = filteredDatabases;
            vm.statsFiltered = filteredStats;
        }


    }

})();

