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
            get: get,
            save: save
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
                ToastrService.success('Announcer created','SUCCESS')
            }

            function onError(error) {
                ToastrService.error('Impossible to create Announcers','XHR Error');
                return $q.reject(error);
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
            };

            return announcer;
        }

        function toPayloadFormat(announcer) {
            var tmp = Object.assign({}, announcer);
            var contacts = [];

            if( tmp.useCompanyAddress ){
                tmp.address = {id: tmp.company.address.id }
            }

            if( tmp.company ) {
                tmp.company = {id: tmp.company.id }
            }

            if( tmp.contacts.length > 0 ) {
                angular.forEach( tmp.contacts, function(contact) {
                    contacts.push({id: contact})
                });

                tmp.contacts = contacts;
            }

            delete tmp.useCompanyAddress;

            return tmp;
        }
    }

})();

