(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .factory('Contact', Contact);

    Contact.$inject = ['$resource', '$q', 'ToastrService', 'API_BASE_URL'];

    /* @ngInject */
    function  Contact($resource, $q, ToastrService, API_BASE_URL) {

        var service = {
            init: initContact,
            getAll: getAll,
            get: get,
            save:save,
            update:update,
            delete:deleteContact
        };

        var resourceUrl = API_BASE_URL + '/api/contacts/:id';

        var resource = $resource( resourceUrl, {}, {
            'save': { method:'POST'},
            'patch': { method:'PATCH'},
            'delete':{ method:'DELETE'}
        });

        return service;

        ////////////////

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
            return resource.get(
                {
                    id: contactId,
                    'context': angular.toJson(context)
                }
            )
                .$promise
                .then(onSuccess)
                .catch(onError);

            function onSuccess(response) {
                delete response.$promise;
                delete response.$resolved;

                return response;
            }

            function onError(error) {
                ToastrService.error('Impossible to retrieve Contact', 'XHR Error');
                return $q.reject(error);
            }
        }

        function save(contact){
            return resource.save(toPayloadFormat(contact), onSuccess, onError).$promise;

            function onSuccess() {
                ToastrService.success('Contact created', 'SUCCESS');
            }

            function onError(error) {
                ToastrService.error('Impossible to create contact', 'XHR Error');
                return $q.reject(error);
            }
        }

        function update(contact) {
            return resource.patch({id: contact.id}, toPayloadFormat(contact)).$promise
                .then(onSuccess)
                .catch(onError);

            function onSuccess() {
                ToastrService.success('Contact edited', 'SUCCESS');
            }

            function onError(error) {
                ToastrService.error('Impossible to edit contact', 'XHR Error');
                return $q.reject(error);
            }
        }

        function deleteContact(contactId) {
            return resource.delete({id: contactId}).$promise
                .then(onSuccess)
                .catch(onError);

            function onSuccess() {
                ToastrService.success('Contact deleted', 'SUCCESS');
            }

            function onError(error) {
                ToastrService.error('Impossible to delete contact', 'XHR Error');
                return $q.reject(error);
            }
        }

        function initContact() {
            return {
                firstname: '',
                surname: '',
                civility: 'Monsieur',
                company: null,
                fonction: '',
                type: 'Billing',
                mail: '',
                phone: '',
                skype: ''
            }
        }

        function toPayloadFormat(contact) {
            var tmp = Object.assign({}, contact);

            delete tmp.id;
            delete tmp.announcers;
            if (tmp.company){ tmp.company = tmp.company.id }

            return tmp;
        }
    }

})();

