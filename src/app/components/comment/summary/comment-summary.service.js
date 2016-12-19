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
            'update': {method: 'PATCH'},
            'saveComment' : {
                method: 'POST',
                url: API_BASE_URL + '/comment/save'
            }
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

            return resource.saveComment(toPayloadFormat(comment,stats))
                .$promise
                .then(onSuccess)
                .catch(onError);

            function onSuccess() {
                ToastrService.success('Comment created','SUCCESS')
            }

            function onError(error) {
                ToastrService.error('Impossible to create Comment','XHR Error');
                return $q.reject(error);
            }
        }

        function init() {
            return {
                id: null,
                content: null,
                summaries: []
            };
        }

        function toPayloadFormat(comment,stats) {
            var tmp = Object.assign({}, comment);

            tmp.summaries = findSummariesByDateAndDbName(comment.date, comment.databases, stats);

            delete tmp.id;
            delete tmp.databases;
            delete tmp.date;

            return tmp;
        }

        function findSummariesByDateAndDbName(date, databases, stats) {

            var summaries = [];
            var dateFormatted = moment(date).format("YYYY-MM-DD");
            var statsLength = stats.length;
            var i = 0;

            for(i ; i < statsLength ; i++ ){
                var tempDate = moment(stats[i].date.date).format("YYYY-MM-DD");

                var index = indexOfArrayObject(stats[i].database_id, databases, 'id');

                if ((index  -1) && (tempDate == dateFormatted)) {
                    summaries.push(stats[i].resume_id)

                }

            }

            return summaries;
        }


        function indexOfArrayObject(value,array,field) {
            for( var res = 0 ; res < array.length ; res++ ) {


                if (array[res][field] == value) {
                    return +res
                }
            }
            return -1;
        }

        function formatDateToQuery(date) {
            return date.format(dateFormat);
        }
    }
})();
