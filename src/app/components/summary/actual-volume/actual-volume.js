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

    ActualVolumeController.$inject = ['ActualVolume'];

    /* @ngInject */
    function ActualVolumeController(ActualVolume) {
        var vm = this;
        vm.dates = {};
        vm.stats = [];       // RECEIVED DATA
        vm.databases = [];   // TAB DATA
        vm.dataFilters = {}; // FILTER CONTENT
        vm.totals = {};

        vm.onChangeDates = onChangeDates;
        vm.$onInit = onInit;

        /////////////////////////////////////////////

        function onInit(){
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
                parseData();
            }

            function onError(error) {
                console.log(error);
            }
        }

        function parseData() {

            vm.stats.sort(function(a,b){
                var dateA = moment(a.date.date);
                var dateB = moment(b.date.date);

                return dateA - dateB;
            });

            loadDataForVolumesChart();

            angular.forEach(vm.stats, function(stat) {

                addStatToDatabase(stat);

                addCompanyToFilter(stat);
                addCountryToFilter(stat);
                addTypeToFilter(stat);


            });

            angular.forEach(vm.databases, function(database) {
                setProcessedValues(database);
            });
        }

        /*------------------------------------//

             PROCESSING DATA FOR GRAPH

             IN : DATABSES SELECTED
             OUT : GRAPH OBJECTS

         //------------------------------------*/


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

        /**
         * IN : Ordered stats by date ASC ( Mandatory for function to work properly )
         */
        function loadDataForVolumesChart() {

            var dateFormat = 'YYYY-MM-DD';
            var labelsVolume     = [];
            var labelsTotals     = [];
            var dataVolume = [];
            var dataTotals = [];
            var total      = 0;
            var dataIndex  = 0;
            var statsLength = vm.stats.length;


            /**
             * Init of labels and data with the first stat
             */
            var firstDate = moment(vm.stats[0].date.date).format(dateFormat);
            var firstValue = +vm.stats[0].volume_sent;

            labelsVolume.push(firstDate);
            dataVolume[dataIndex] = firstValue;

            total += firstValue;

            /**
             * Loop to insert the data and labels starting to index 1
             */
            var currentDate = firstDate;
            var stat;
            var statValue;
            var statDate;

            for( var i = 1 ; i < statsLength ; i++) {

                stat = vm.stats[i];
                statDate = moment(stat.date.date).format(dateFormat);
                statValue = +stat.volume_sent;
                total += statValue;

                if(statDate == currentDate) {
                    dataVolume[dataIndex] += statValue;
                } else {
                    labelsVolume.push(statDate);
                    currentDate = statDate;
                    dataTotals.push(total);
                    dataIndex++;
                    dataVolume[dataIndex] = statValue
                }
            }

            dataTotals.push(total);

            /**
             * Calcul des prévisions
             */
            var dataTotalsAvg = angular.copy(dataTotals);
            var dataTotalsDayBefore = angular.copy(dataTotals);
            var dataTotalsLength = dataTotals.length;
            var lastTotalAvg = dataTotals[dataTotalsLength - 1];
            var lastTotalDayBefore = dataTotals[dataTotalsLength - 1];
            var stepAvg = +( lastTotalAvg / dataTotalsLength ).toFixed(0);
            var daysInMonth = moment(currentDate).endOf('month').format('DD');
            var daysLeft = daysInMonth - dataTotalsLength;

            var stepDayBefore = +(dataTotals[dataTotalsLength - 1] - dataTotals[dataTotalsLength - 2]);

            labelsTotals = angular.copy(labelsVolume);

            for( var k = daysLeft ; k > 0 ; k-- ) {
                currentDate = moment(currentDate).add(1, 'days');

                lastTotalAvg += stepAvg;
                lastTotalDayBefore += stepDayBefore;

                labelsTotals.push(currentDate.format(dateFormat));

                dataTotalsAvg.push(lastTotalAvg);
                dataTotalsDayBefore.push(lastTotalDayBefore);
            }

            /**
             * Calcul de la moyenne
             */
            var labelsLength = labelsVolume.length;
            var avg = ( total / labelsLength ).toFixed(0);
            var dataAvg = [];

            for( var j = 0 ; j < labelsLength ; j++ ){
                dataAvg[j] = avg;
            }

            vm.chartVolumeObject.labels = labelsVolume;
            vm.chartVolumeObject.data.push(dataVolume);
            vm.chartVolumeObject.data.push(dataAvg);

            vm.chartTotalsObject.labels = labelsTotals;
            vm.chartTotalsObject.data.push(dataTotalsAvg);
            vm.chartTotalsObject.data.push(dataTotalsDayBefore);
        }


        /*------------------------------------//

            PROCESSING STATS SECTION FOR TAB

            IN : DATABASES SELECTED
            OUT : TOTALS (table),

         //------------------------------------*/

        vm.totals = {
            actualVolume: 0,
            daybeforeVolume: 0,
            predictActualVolume: 0,
            predictDaybeforeVolume: 0,
            predictCombined: 0
        };

        function setProcessedValues(database) {

            var predictActualVolumeDayBefore = getPredictVolumeDayBefore(database.daybefore_volume, database.date, database.total);
            var predictVolumeDayBefore = getPredictVolumeAsMonth(database.daybefore_volume, database.date);
            var predictVolume = getPredictActualVolume(database.total, database.date);

            database.predictActualVolumeDayBefore = predictActualVolumeDayBefore;
            database.predictVolumeDayBefore       = predictVolumeDayBefore;
            database.predictVolume                = predictVolume;

            vm.totals.predictDaybeforeVolume += predictVolumeDayBefore;
            vm.totals.predictCombined += predictActualVolumeDayBefore;
            vm.totals.predictActualVolume += predictVolume;
            vm.totals.actualVolume += database.total;
            vm.totals.daybeforeVolume += database.daybefore_volume;
        }

        function getPredictVolumeDayBefore(volume, date, total) {

            var dayBeforeV;
            var remainingDays;
            var daysInMonth = +moment(date).endOf('month').format('DD');

            if (vm.dates.endDateDay < moment().format('DD')) {
                dayBeforeV = vm.dates.endDateDay - 1;
            } else {
                //noinspection JSUnresolvedFunction
                dayBeforeV = moment().subtract(1, 'day').format('DD');
            }

            remainingDays = daysInMonth - dayBeforeV;

            return (remainingDays * +volume) + total;
        }

        function getPredictActualVolume(volume, date) {

            var pastDays;
            var daysInMonth;
            var averageDailyVolume;

            if (vm.dates.endDateDay < moment().format('DD')) {
                pastDays = vm.dates.endDateDay;
            } else {
                pastDays = moment().format('DD');
            }

            daysInMonth = moment(date).endOf('month').format('DD');
            averageDailyVolume = +volume / pastDays;

            return averageDailyVolume * daysInMonth;
        }

        function getPredictVolumeAsMonth(volume, date) {

            var daysInMonth = moment(date).endOf('month').format('DD');

            return +volume * daysInMonth;
        }

        /*------------------------------------//

             PROCESSING STATS SECTION FOR FORMATING

             IN : STATS (from HTTP Request)
             OUT : DATABASES + FILTERS CONTENT

         //------------------------------------*/

        vm.dataFilters = {
            databases: [],
            companies: [],
            types:     [],
            countries:   [],
            actives: [{
                name: 'Enabled',
                value: true
            },{
                name: 'Disabled',
                value: false
            }]
        };

        function addStatToDatabase(value) {

            var index = indexOfArrayObject(value.database_id, vm.databases, 'id');

            if( index == -1){
                var databaseStat = {
                    summary_id: value.resume_id,
                    id: value.database_id,
                    company_id: value.company_id,
                    company_name: value.company_name,
                    database_type: value.database_type,
                    active: value.active,
                    planche_id: value.planche_id,
                    router_name: value.router_name,
                    database_name: value.database_name,
                    database_country: value.database_country,
                    total: +value.volume_sent,
                    date: value.date.date,
                    daybefore_volume: +value.volume_sent
                };

                var databaseFilter = {
                    id: value.database_id,
                    name: value.database_name
                };

                vm.dataFilters.databases.push(databaseFilter);
                vm.databases.push(databaseStat);

            } else {
                vm.dataFilters.databases[index].total += value.volume_sent;
                if( value.date.date >vm.dataFilters.databases[index].date ) {
                    vm.dataFilters.databases[index] = value.date.date;
                    vm.dataFilters.databases[index].daybefore_volume = value.volume_sent;
                }
            }

        }

        function addCompanyToFilter(stat) {

            if( indexOfArrayObject(stat.company_id, vm.dataFilters.companies, 'id') == -1) {
                var company = {
                    id: stat.company_id,
                    name: stat.company_name
                };
                vm.dataFilters.companies.push(company);
            }
        }

        function addCountryToFilter(stat) {

            if( indexOfArrayObject(stat.company_country, vm.dataFilters.countries, 'name') == -1) {
                var country = {
                    name: stat.company_country
                };
                vm.dataFilters.countries.push(country);
            }
        }

        function addTypeToFilter(stat) {
            if( indexOfArrayObject(stat.database_type, vm.dataFilters.types, 'name') == -1) {
                var type = {
                    name: stat.database_type
                };
                vm.dataFilters.types.push(type);
            }
        }

        function indexOfArrayObject(value,array,field) {
            for( var res = 0 ; res < array.length ; res++ ) {
                if (array[res][field] == value) { return res }
            }
            return -1;
        }

    }

})();

