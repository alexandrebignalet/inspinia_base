(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .factory('Tag', Tag);

    Tag.$inject = ['$resource', 'ToastrService', '$q', 'API_BASE_URL'];

    /* @ngInject */
    function Tag($resource, ToastrService, $q, API_BASE_URL) {

        var resourceUrl = API_BASE_URL + '/api/tags/:id';

        var resource = $resource(resourceUrl, {}, {
            "update": {method: 'PATCH'}
        });

        var service = {
            getAll: getAll,
            get: get,
            save: save,
            update: update,
            delete: remove,
            init: init
        };

        return service;

        ////////////////

        function getAll(context) {
            return resource.get({ 'context': angular.toJson(context) })
                .$promise
                .then(getTagsThen)
                .catch(getTagsCatch);

            function getTagsThen(data){ return data.tags }
            function getTagsCatch(error){
                ToastrService.error(error, 'XHR Error');
                return $q.reject(error);
            }
        }

        function get(id, context) {
            return resource.get({'id': id, 'context': context})
                .$promise
                .then(getTagThen)
                .catch(getTagCatch);

            function getTagThen(data){
                delete data.$promise;
                delete data.$resolved;

                return data
            }
            function getTagCatch(error){
                ToastrService.error(error, 'XHR Error');
                return $q.reject(error);
            }
        }

        function save(tag){
            return resource.save(toPayloadFormat(tag))
                .$promise
                .then(onSaveSuccess)
                .catch(onSaveError);

            function onSaveSuccess(data){ return data }
            function onSaveError(error){
                ToastrService.error(error, 'XHR Error');
                return $q.reject(error);
            }
        }

        function update(tag){
            return resource.update({'id': tag.id}, toPayloadFormat(tag))
                .$promise
                .then(onSaveSuccess)
                .catch(onSaveError);

            function onSaveSuccess(data){ return data }
            function onSaveError(error){
                ToastrService.error(error, 'XHR Error');
                return $q.reject(error);
            }
        }

        function remove(tagId){
            return resource.delete({'id': tagId})
                .$promise
                .then(onSaveSuccess)
                .catch(onSaveError);

            function onSaveSuccess(data){ return data }
            function onSaveError(error){
                ToastrService.error(error, 'XHR Error');
                return $q.reject(error);
            }
        }

        function init() {
            return {
                id: null,
                tag: null
            }
        }

        function toPayloadFormat(tag){
            var tmp = Object.assign({}, tag);

            delete tmp.id;

            return tmp;
        }
    }

})();

