(function () {
    'use strict';

    angular
        .module('accounting.system')
        .factory('QuickbooksDataService', QuickbooksDataService);

    QuickbooksDataService.$inject = ['$resource','NODE_API_BASE_URL', 'AuthQuickbooks'];

    /* @ngInject */
    function QuickbooksDataService($resource, NODE_API_BASE_URL, AuthQuickbooks) {

        const resourceUrl = NODE_API_BASE_URL+'/quickbooks/controllers/:entityAlias/:id';

        var resource = $resource(resourceUrl, {entityAlias: '@entityAlias',id: '@id'}, {
            get:    { method: 'GET' , headers: AuthQuickbooks.getHeaders() },
            update: { method: 'PATCH', headers: AuthQuickbooks.getHeaders() },//, transformRequest: addHeaders },
            save:   { method: 'POST', headers: AuthQuickbooks.getHeaders() },//, transformRequest: addHeaders },
            pdf:    {
                method: 'GET',
                url: NODE_API_BASE_URL+'/quickbooks/controllers/:entityAlias/:id/pdf',// transformRequest: addHeaders
                responseType: 'arraybuffer',
                headers: AuthQuickbooks.getHeaders()
            },
            send:   {
                method: 'GET',
                url: NODE_API_BASE_URL+'/quickbooks/controllers/:entityAlias/:id/sendTo/:email', //transformRequest: addHeaders
                headers: AuthQuickbooks.getHeaders()
            }
        });

        var service = {
            get: get,
            query: query,
            save: save,
            update: update,
            delete: remove,
            pdf: pdf,
            send: send
        };

        return service;

        function get(entityAlias, id) {
            return resource.get({ entityAlias: entityAlias, id: id })
                .$promise
                .then(onSuccess)
                .catch(onError);
        }

        function query(entityAlias, params) {

            var resourceParams = {
                entityAlias: entityAlias
            };

            params.forEach(function(param, key){
                resourceParams['key'] = param
            });

            return resource.get(resourceParams)
                .$promise
                .then(onSuccess)
                .catch(onError);
        }

        function update(entityAlias, id, payload) {
            return resource.update({ entityAlias: entityAlias, id: id }, payload)
                .$promise
                .then(onSuccess)
                .catch(onError);
        }

        function remove(entityAlias, id) {
            return resource.delete({ entityAlias: entityAlias, id: id })
                .$promise
                .then(onSuccess)
                .catch(onError);
        }

        function save(entityAlias, payload) {
            return resource.save({ entityAlias: entityAlias }, payload)
                .$promise
                .then(onSuccess)
                .catch(onError);
        }

        function pdf(entityAlias, id){
            return resource.pdf({ entityAlias: entityAlias, id: id })
                .$promise
                .then(onGetPdf)
                .catch(onError);

            function onGetPdf(pdf){
                var file = new Blob([pdf.data], {type: 'application/pdf'});

                return URL.createObjectURL(file);
            }
        }

        function send(entityAlias, id, email){
            return resource.send({ entityAlias: entityAlias, id: id, email: email })
                .$promise
                .then(onSuccess)
                .catch(onError);
        }

        function onSuccess(data){
            return data
        }

        function onError(error){
            throw error
        }
    }

})();
