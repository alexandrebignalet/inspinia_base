/**
 * Created by Axel on 18/11/2016.
 */
(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .factory('Announcer', Announcer);

    Announcer.$inject = ['$resource','API_BASE_URL'];

    /* @ngInject */
    function  Announcer($resource, API_BASE_URL) {
        var resourceUrl = API_BASE_URL+'/api/announcers/:id';

        return $resource(resourceUrl, {}, {
            'update': {method: 'PUT'},
            'save_platform_access': {
                method: 'POST',
                url:  API_BASE_URL+'/announcers/:announcerId/platform-access/json'
            },
            'update_platform_access': {
                method: 'PATCH',
                url:  API_BASE_URL+'/announcers/platform-access/:platformId/json',
                headers: {
                    'Content-Type': 'application/json'
                }
            },
            'delete_platform_access' : {
                method: 'DELETE',
                url:  API_BASE_URL+'/announcers/platform-access/:platformId/json'
            }
        });
    }

})();

