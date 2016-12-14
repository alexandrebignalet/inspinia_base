(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .factory('CommentSummary', CommentSummary);

    CommentSummary.$inject = ['$resource','$http', 'API_BASE_URL', 'ToastrService', '$q'];

    function CommentSummary($resource, $http, API_BASE_URL, ToastrService, $q) {

        var service = {
            get: get,
            getByDateRage: getByDateRage,
            save: save,
            init: init
        };

        var resourceUrl = API_BASE_URL+'/api/summary/:id/comments/json';
        var dateFormat = 'YYYY-MM-DD';
        var resource = $resource(resourceUrl, {}, {
            'update': {method: 'PATCH'}
        });

        return service;

        function getByDateRage(startDate, endDate) {
            var formatedStartDate = formatDateToQuery(startDate);
            var formatedEndDate = formatDateToQuery(endDate);

            return $http({
                method: 'GET',
                url: API_BASE_URL + "/comment/summary/" + formatedStartDate + "/" + formatedEndDate
            });
        }

        function get(idSummary, context){
            return resource.get({
                'id': idSummary,
                'context': angular.toJson(context)
            })
                .$promise
                .then(getCommentThen)
                .catch(getCommentCatch);

            function getCommentThen(data) {
                return data;
            }

            function getCommentCatch(error) {
                ToastrService.error('Impossible to retrieve the Comment','XHR Error');
                return $q.reject(error);
            }
        }

        function save(comment,stats) {

            console.log(comment);
            console.log(stats);

            comment.date.format('YYYY-MM-DD');

            findSummariesByDateAndDbName(comment.date, comment.databases, stats);

            return

            /*return resource.save({
                'id': idSummary,
                'context': context
            }, toPayloadFormat(comment))
                .$promise
                .then(onSuccess)
                .catch(onError);

            function onSuccess() {
                ToastrService.success('Comment created','SUCCESS')
            }

            function onError(error) {
                ToastrService.error('Impossible to create Comment','XHR Error');
                return $q.reject(error);
            }*/
        }

        function init() {
            return {
                id: null,
                content: null,
                summaries: []
            };
        }

        function toPayloadFormat(comment,selectedDatabases,date,stats) {
            var tmp = Object.assign({}, comment);

            delete tmp.id;

            return tmp;
        }

        function findSummariesByDateAndDbName(date, databases, stats) {

            var summaries;
            var dateFormatted = moment(date).format("YYYY-MM-DD");

            angular.forEach()


            /*var summaries = [];
            var dateFormatted = moment(date).format("YYYY-MM-DD");

            angular.forEach(databases, function (database) {

                var index = indexOfArrayObject(database.id,stats,'database_id');

                if ( index !== -1 ) {

                    var stat = stats[index];

                    var tempDate = moment(stat.date.date).format('YYYY-MM-DD');

                    console.log(dateFormatted);
                    console.log(tempDate);

                    if( tempDate == dateFormatted ) {
                        summaries.push(stat.resume_id);
                    }

                }

            });

            console.log(summaries);*/
        }



        function indexOfArrayObject(value,array,field) {
            for( var res = 0 ; res < array.length ; res++ ) {
                if (array[res][field] == value) { return res }
            }
            return -1;
        }

        function formatDateToQuery(date) {
            return date.format(dateFormat);
        }
    }
})();
