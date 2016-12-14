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

    ActualVolumeController.$inject = ['ActualVolume','CommentSummary','$filter','DTOptionsBuilder','DTColumnDefBuilder'];

    /* @ngInject */
    function ActualVolumeController(ActualVolume,CommentSummary,$filter,DTOptionsBuilder,DTColumnDefBuilder) {
        var vm = this;
        vm.dates = {};
        vm.stats = [];
        vm.statsFiltered = [];
        vm.databases = [];
        vm.databasesFiltered = [];
        vm.comments = [];
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

        vm.dtOptions = DTOptionsBuilder.newOptions()
            .withOption('paging', false)
            .withDOM('t');

        vm.DTColumnDefs = [
            DTColumnDefBuilder.newColumnDef("sorting_disabled").notSortable()
        ];



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
                .then(onSuccessGetSummary)
                .catch(onErrorGetSummary);

            CommentSummary.getByDateRage(dates.startDate, dates.endDate)
                .then(onSuccessGetComments)
                .catch(onErrorGetComments);



            function onSuccessGetComments(response) {
                vm.comments = response.data;
            }

            function onErrorGetComments(error) {
                console.log(error);
            }

            function onSuccessGetSummary(response){

                vm.stats = response.data;
                vm.stats.sort(function(a,b){
                    var dateA = moment(a.date.date);
                    var dateB = moment(b.date.date);

                    return dateA - dateB;
                });

                vm.filtersContent = ActualVolume.parseResponse(vm.stats,vm.databases);
                console.log(vm.filtersContent);
                ActualVolume.getProcessedValues(vm.databases,vm.totals, vm.dates.endDateDay);
                ActualVolume.getGraphsObject(vm.stats, vm.chartVolumeObject, vm.chartTotalsObject);

                vm.statsFiltered     = vm.stats;
                vm.databasesFiltered = vm.databases;

            }
            function onErrorGetSummary(error) {
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
            filteredDatabases = $filter('propsOnArrayFilterJs')(filteredDatabases,'database_country',vm.filtersValue.selectedCountries,'name');
            filteredDatabases = $filter('propsOnArrayFilterJs')(filteredDatabases,'company_id',vm.filtersValue.selectedCompanies,'id');
            filteredDatabases = $filter('propsOnArrayFilterJs')(filteredDatabases,'database_type',vm.filtersValue.selectedTypes,'name');
            filteredDatabases = $filter('propsOnArrayFilterJs')(filteredDatabases,'active',vm.filtersValue.selectedActives,'value');

            var filteredStats = $filter('propsOnArrayFilterJs')(vm.stats,'database_id',vm.filtersValue.selectedDatabases,'id');
            filteredStats = $filter('propsOnArrayFilterJs')(filteredStats,'database_country',vm.filtersValue.selectedCountries,'name');
            filteredStats = $filter('propsOnArrayFilterJs')(filteredStats,'company_id',vm.filtersValue.selectedCompanies,'id');
            filteredStats = $filter('propsOnArrayFilterJs')(filteredStats,'database_type',vm.filtersValue.selectedTypes,'name');
            filteredStats = $filter('propsOnArrayFilterJs')(filteredStats,'active',vm.filtersValue.selectedActives,'value');

            vm.databasesFiltered = filteredDatabases;
            vm.statsFiltered = filteredStats;
        }

    }

})();

