(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .factory('Contact', Contact);

    Contact.$inject = ['$resource', '$q', 'ToastrService', 'API_BASE_URL'];

    /* @ngInject */
    function  Contact($resource, $q, ToastrService, API_BASE_URL) {

        var resourceUrl = API_BASE_URL + '/api/contacts/:id';

        var resource = $resource( resourceUrl, {}, {
            'save': { method:'POST'},
            'patch': { method:'PATCH'},
            'delete':{ method:'DELETE'}
        });

        function getAll(context) {
            return resource.get({
                'context': angular.toJson(context)
            }).$promise
                .then(getContactsThen)
                .catch(getContactsError);

            function getContactsThen(data) {
                return data.contacts;
            }

            function getContactsError(error) {
                ToastrService.error('Impossible to retrieve Contacts','XHR Error');
                return $q.reject(error);
            }
        }

        function get(contactId, context) {
            return resource.get({id: contactId}).$promise
                .then(onSuccess)
                .catch(onError);

            function onSuccess(response) {
                return response;
            }

            function onError(error) {
                ToastrService.error('Impossible to retrieve Contact', 'XHR Error');
                return $q.reject(error);
            }
        }

        function save(contact){
            return resource.save(contact, onSuccess, onError).$promise;

            function onSuccess(response) {
                ToastrService.success('Contact created', 'SUCCESS')
            }

            function onError(error) {
                ToastrService.error('Impossible to create contact', 'XHR Error');
                return $q.reject(error);
            }
        }

        function initContact(idContact) {
            var contact = {
                firstname: '',
                surname: '',
                civility: 'Monsieur',
                company: null,
                fonction: '',
                type: 'Billing',
                mail: '',
                phone: '',
                skype: ''
            };

            if( idContact ) {
                contact = Contact.get(idContact);
            }

            return contact;
        }

        return {
            initContact: initContact,
            getAll: getAll,
            save:save,
            get: get
        }
    }

})();

