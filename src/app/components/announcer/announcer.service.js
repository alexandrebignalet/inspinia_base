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
            'update': {method: 'PUT'}
        });

        /////////////////////////////////////////////

        var service = {
            initAnnouncer: initAnnouncer,
            getAll: getAll,
            get: get
        };

        return service;

        ////////////////////////////////////////////

        function get(id, context){
            return resource.get({
                'id': id,
                'context': angular.toJson(context)
            }).$promise
                .then(getAnnouncerThen)
                .catch(getAnnouncerCatch);

            function getAnnouncerThen(data) {
                return data;
            }

            function getAnnouncerCatch(error) {
                ToastrService.error('Impossible to retrieve the Announcer','XHR Error');
                return $q.reject(error);
            }
        }

        function getAll(context) {
            return resource.get({
                'context': angular.toJson(context)
            })
                .$promise
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

        function save(announcer) {
            return resource.save(toPayloadFormat(announcer))
                .$promise
                .then(onSuccess)
                .catch(onError);

            function onSuccess() {
                //ToastrService.
            }
        }

        function initAnnouncer() {
            var announcer = {
                announcer: '',
                country: '',
                platform: '',
                company: null,
                reinerouge_id: '',
                contacts: [],
                address: ''
            }

            return announcer;
        }
    }

})();
