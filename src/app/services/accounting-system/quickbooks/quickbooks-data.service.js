(function () {
    'use strict';

    angular
        .module('accounting.system')
        .factory('QuickbooksDataService', QuickbooksDataService);

    QuickbooksDataService.$inject = ['$resource','NODE_API_BASE_URL'];

    /* @ngInject */
    function QuickbooksDataService($resource, NODE_API_BASE_URL) {

        const resourceUrl = NODE_API_BASE_URL+'/quickbooks/controllers/:entityAlias/:id'

        return $resource(resourceUrl, {entityAlias: '@entityAlias',id: '@id'}, {
            'update': {method: 'PATCH'}
        })
    }

})();
