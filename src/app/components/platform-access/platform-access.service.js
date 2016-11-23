(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .factory('PlatformAccess', PlatformAccess);

    PlatformAccess.$inject = ['$resource', '$q', 'ToastrService', 'API_BASE_URL', 'Announcer'];

    /* @ngInject */
    function PlatformAccess($resource, $q, ToastrService, API_BASE_URL, Announcer) {

        var resource = $resource(API_BASE_URL, {}, {
            'get': {
                method: 'GET',
                url: API_BASE_URL + '/api/announcers/platform-access/:platformId/json'
            },
            'save': {
                method: 'POST',
                url:  API_BASE_URL + '/api/announcers/:announcerId/platform-access/json'
            },
            'update': {
                method: 'PATCH',
                url:  API_BASE_URL + '/api/announcers/platform-access/:platformId/json',
                headers: {
                    'Content-Type': 'application/json'
                }
            },
            'delete' : {
                method: 'DELETE',
                url:  API_BASE_URL + '/api/announcers/platform-access/:platformId/json'
            }
        });

        ///////////////

        var service = {
            get: get,
            save: save,
            update: update,
            delete: remove,
            init: init
        };

        return service;

        ////////////////

        function get(platformId) {

            return resource.get({
                platformId: platformId
            },{
                'context': angular.toJson(['platform_access_all'])
            })
                .$promise
                .then(getPlatformAccessSuccess)
                .catch(getPlatformAccessError);

            function getPlatformAccessSuccess(response) {
                return response.data;
            }

            function getPlatformAccessError(error) {
                ToastrService.error('Impossible to retrieve Platform Acces','XHR Error');
                return $q.reject(error);
            }
        }

        function save(platformAccess) {

            return resource.save({announcerId : platformAccess.announcer.id}, toPayloadFormat(platformAccess))
                .$promise
                .then(onSaveSuccess)
                .catch(onSaveError);

            function onSaveSuccess() {
                ToastrService.success('Platform Access Created','SUCCESS');
            }

            function onSaveError(error) {
                ToastrService.error('Impossible to save Platform Access','XHR Error');
                return $q.reject(error);
            }
        }

        function update(platformAccess) {
            return resource.update({platformId : platformAccess.id}, platformAccess)
                .$promise
                .then(onSaveSuccess)
                .catch(onSaveError);

            function onSaveSuccess() {
                ToastrService.success('Platform Access Updated','SUCCESS');
            }

            function onSaveError(error) {
                ToastrService.error('Impossible to save Platform Access','XHR Error');
                return $q.reject(error);
            }
        }

        function remove(platformAccessId) {
            return resource.delete({platformId: platformAccessId})
                .$promise
                .then(onSuccess)
                .catch(onError);

            function onSuccess() {
                ToastrService.success('Platform Access Deleted','SUCCESS');
            }

            function onError(error) {
                ToastrService.error('Impossible to delete Platform Access','XHR Error');
                return $q.reject(error);
            }
        }

        function init() {
            return {
                announcer: null,
                url: null,
                username: null,
                password: null,
                description: null
            }
        }

        function toPayloadFormat(platformAccess){
            var tmp = Object.assign({}, platformAccess);

            delete tmp.announcer;

            return tmp;
        }
    }

})();

