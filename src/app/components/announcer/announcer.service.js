(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .factory('Announcer', Announcer);

    Announcer.$inject = ['$resource', '$q', 'ToastrService', 'API_BASE_URL'];

    /* @ngInject */
    function  Announcer($resource, $q, ToastrService, API_BASE_URL) {

        var resourceUrl = API_BASE_URL+'/api/announcers/:id';

        var resource = $resource(resourceUrl, {}, {
            'update': {method: 'PUT'},
            'get_platform_access': {
                method: 'GET',
                url: API_BASE_URL + '/api/announcers/platform-access/:platformId/json'
            },
            'save_platform_access': {
                method: 'POST',
                url:  API_BASE_URL + '/api/announcers/:announcerId/platform-access/json'
            },
            'update_platform_access': {
                method: 'PATCH',
                url:  API_BASE_URL + '/api/announcers/platform-access/:platformId/json',
                headers: {
                    'Content-Type': 'application/json'
                }
            },
            'delete_platform_access' : {
                method: 'DELETE',
                url:  API_BASE_URL + '/api/announcers/platform-access/:platformId/json'
            }
        });

        function getAll(context) {
            return resource.get({
                'context': angular.toJson(context)
            }).$promise
                .then(getAnnouncersThen)
                .catch(getAnnouncersCatch);

            function getAnnouncersThen(data) {
                return data.announcers;
            }

            function getAnnouncersCatch(error) {
                ToastrService.error('Impossible to retrieve Announcers','XHR Error');
                return $q.reject(error);
            }
        }

        function getPlatformAccess(platformId) {

            return resource.get_platform_access({
                platformId: platformId
            },{
                'context': angular.toJson(['platform_access_all'])
            },getPlatformAccessSuccess,getPlatformAccessError);

            function getPlatformAccessSuccess(response) {
                return response.data;
            }

            function getPlatformAccessError(error) {
                ToastrService.error('Impossible to retrieve Platform Acces','XHR Error');
                return $q.reject(error);
            }
        }

        function savePlatformAccess(platformAccess) {
            return resource.save_platform_access({announcerId : platformAccess.announcer},{
                url: platformAccess.url,
                username: platformAccess.username,
                password: platformAccess.password,
                description: platformAccess.description
            },onSaveSuccess,onSaveError).$promise;

            function onSaveSuccess() {
                ToastrService.success('Platform Access Created','SUCCESS');
            }

            function onSaveError(error) {
                ToastrService.error('Impossible to save Platform Access','XHR Error');
                return $q.reject(error);
            }
        }

        function updatePlatformAccess(platformAccess) {
            return resource.update_platform_access({platformId : platformAccess.id},{
                url: platformAccess.url,
                username: platformAccess.username,
                password: platformAccess.password,
                description: platformAccess.description
            },onSaveSuccess,onSaveError).$promise;

            function onSaveSuccess() {
                ToastrService.success('Platform Access Updated','SUCCESS');
            }

            function onSaveError(error) {
                ToastrService.error('Impossible to save Platform Access','XHR Error');
                return $q.reject(error);
            }
        }

        function deletePlatformAccess(platformAccessId) {
            return resource.delete_platform_access({platformId: platformAccessId}, onSuccess, onError).$promise;

            function onSuccess() {
                ToastrService.success('Platform Access Deleted','SUCCESS');
            }

            function onError(error) {
                ToastrService.error('Impossible to delete Platform Access','XHR Error');
                return $q.reject(error);
            }
        }


        return {
            getAll: getAll,
            getPlatformAccess: getPlatformAccess,
            savePlatformAccess: savePlatformAccess,
            updatePlatformAccess: updatePlatformAccess,
            deletePlatformAccess: deletePlatformAccess
        }
    }

})();

