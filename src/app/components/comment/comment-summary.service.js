(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .factory('CommentSummary', CommentSummary);

    CommentSummary.$inject = ['$resource', 'API_BASE_URL', 'ToastrService', '$q'];

    function CommentSummary($resource, API_BASE_URL, ToastrService, $q) {

        var service = {
            get: get,
            save: save,
            init: init
        };

        var resourceUrl = API_BASE_URL+'/api/summaries/:id/comments/json';

        var resource = $resource(resourceUrl, {}, {
            'update': {method: 'PATCH'}
        });

        return service;

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

        function save(idSummary, comment, context) {
            return resource.save({
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
            }
        }

        function init() {
            return {
                id: null,
                content: null
            };
        }

        function toPayloadFormat(comment) {
            var tmp = Object.assign({}, comment);

            delete tmp.id;

            return tmp;
        }
    }
})();
