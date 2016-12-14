(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .factory('ActualVolume', ActualVolume);

    ActualVolume.$inject = ['$http', 'API_BASE_URL'];

    /* @ngInject */
    function ActualVolume($http, API_BASE_URL) {

        var resourceUrl = API_BASE_URL + '/';
        var dateFormat = 'YYYY-MM-DD';

        /////////////////////////////////////////////

        var service = {
            getSummaryVolumes: getSummaryVolumes,
            getCommentByDate: getCommentByDate,
            saveComment: saveComment,
            parseResponse: parseResponse,
            getProcessedValues: getProcessedValues,
            getGraphsObject: getGraphsObject
        };

        return service;

        /////////////////////////////////////////////

        function getSummaryVolumes(startDate, endDate) {

            var startDateFormatted  = formatDateToQuery(startDate);
            var endDateFormatted    = formatDateToQuery(endDate);

            return $http({
                method: 'GET',
                url: resourceUrl + "summary/volumes/" + startDateFormatted + "/" + endDateFormatted
            });
        }

        function getCommentByDate(startDate, endDate, type) {

            var startDateFormatted  = formatDateToQuery(startDate);
            var endDateFormatted    = formatDateToQuery(endDate);

            return $http({
                method: 'GET',
                url: resourceUrl + "comment/" + type + "/" + startDateFormatted + "/" + endDateFormatted
            });
        }

        function saveComment(comment) {
            return $http({
                method: 'POST',
                url: resourceUrl + "comment/save",
                data: comment
            });
        }

        function formatDateToQuery(date) {
            return date.format(dateFormat);
        }

        /*----------------------------------------------/

                      CONTROLLER LOGIC

        /----------------------------------------------*/
        /*----------------------------------------------/

         PROCESSING STATS SECTION FOR TAB

         IN : DATABASES SELECTED
         OUT : TOTALS (table),

         /----------------------------------------------*/

        function parseResponse(data,databases) {

            var tmp = {
                databases: [],
                companies: [],
                types: [],
                countries: [],
                actives: [{
                    name: 'Enabled',
                    value: true
                }, {
                    name: 'Disabled',
                    value: false
                }]
            };

            angular.forEach(data, function(stat) {

                addStatToDatabases(stat,databases,tmp);

                addCompanyToFilter(stat,tmp);
                addCountryToFilter(stat,tmp);
                addTypeToFilter(stat,tmp);
            });

            return tmp;
        }

        function addStatToDatabases(value,databases,filters) {

            var index = indexOfArrayObject(value.database_id, databases, 'id');

            if( index == -1){

                var databaseStat = initDatabaseStat(value);

                var databaseFilter = {
                    id: value.database_id,
                    name: value.database_name
                };

                filters.databases.push(databaseFilter);
                databases.push(databaseStat);

            } else {
                databases[index].total += +value.volume_sent;
                if( value.date.date > databases[index].date ) {
                    databases[index].date = value.date.date;
                    databases[index].daybefore_volume = +value.volume_sent;
                }
            }
        }

        function initDatabaseStat(value) {

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

            return databaseStat;
        }

        function addCompanyToFilter(stat,filters) {

            if( indexOfArrayObject(stat.company_id, filters.companies, 'id') == -1) {
                var company = {
                    id: stat.company_id,
                    name: stat.company_name
                };
                filters.companies.push(company);
            }
        }

        function addCountryToFilter(stat,filters) {

            if( indexOfArrayObject(stat.database_country, filters.countries, 'name') == -1) {
                var country = {
                    name: stat.database_country
                };
                filters.countries.push(country);
            }
        }

        function addTypeToFilter(stat,filters) {
            if( indexOfArrayObject(stat.database_type, filters.types, 'name') == -1) {
                var type = {
                    name: stat.database_type
                };
                filters.types.push(type);
            }
        }

        function indexOfArrayObject(value,array,field) {
            for( var res = 0 ; res < array.length ; res++ ) {
                if (array[res][field] == value) { return res }
            }
            return -1;
        }

        /*------------------------------------//

         PROCESSING STATS SECTION FOR TAB

         IN : DATABASES FILTERED
         OUT : TOTALS (table),

         //------------------------------------*/

        function getProcessedValues(databases, totals, endDateDay) {
            angular.forEach(databases, function(database) {
                setProcessedValues(database,totals,endDateDay);
            });
        }

        function setProcessedValues(database,totals,endDateDay) {

            var predictActualVolumeDayBefore = getPredictVolumeDayBefore(database.daybefore_volume, database.date, database.total);
            var predictVolumeDayBefore = getPredictVolumeAsMonth(database.daybefore_volume, database.date);
            var predictVolume = getPredictActualVolume(database.total, database.date);

            database.predictActualVolumeDayBefore = predictActualVolumeDayBefore;
            database.predictVolumeDayBefore       = predictVolumeDayBefore;
            database.predictVolume                = predictVolume;

            totals.predictDaybeforeVolume += predictVolumeDayBefore;
            totals.predictCombined += predictActualVolumeDayBefore;
            totals.predictActualVolume += predictVolume;
            totals.actualVolume += database.total;
            totals.daybeforeVolume += database.daybefore_volume;
        }

        function getPredictVolumeDayBefore(volume, date, total, endDateDay) {

            var dayBeforeV;
            var remainingDays;
            var daysInMonth = +moment(date).endOf('month').format('DD');

            if (endDateDay < moment().format('DD')) {
                dayBeforeV = endDateDay - 1;
            } else {
                //noinspection JSUnresolvedFunction
                dayBeforeV = moment().subtract(1, 'day').format('DD');
            }

            remainingDays = daysInMonth - dayBeforeV;

            return (remainingDays * +volume) + total;
        }

        function getPredictActualVolume(volume, date, endDateDay) {

            var pastDays;
            var daysInMonth;
            var averageDailyVolume;

            if (endDateDay < moment().format('DD')) {
                pastDays = endDateDay;
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

         PROCESSING DATA FOR GRAPH

         IN : DATABSES SELECTED
         OUT : GRAPH OBJECTS

         //------------------------------------*/

        function getGraphsObject(stats,chartVolume,chartTotals) {

            var dateFormat = 'YYYY-MM-DD';
            var labelsVolume     = [];
            var labelsTotals     = [];
            var dataVolume = [];
            var dataTotals = [];
            var total      = 0;
            var dataIndex  = 0;
            var statsLength = stats.length;


            /**
             * Init of labels and data with the first stat
             */
            var firstDate = moment(stats[0].date.date).format(dateFormat);
            var firstValue = +stats[0].volume_sent;

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

                stat = stats[i];
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

            chartVolume.labels = labelsVolume;
            chartVolume.data.push(dataVolume);
            chartVolume.data.push(dataAvg);

            chartTotals.labels = labelsTotals;
            chartTotals.data.push(dataTotalsAvg);
            chartTotals.data.push(dataTotalsDayBefore);
        }


    }

})();

