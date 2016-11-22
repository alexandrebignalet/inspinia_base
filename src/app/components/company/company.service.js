(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .factory('Company', Company);

    Company.$inject = ['$resource','API_BASE_URL'];

    function Company ($resource, API_BASE_URL) {
        var resourceUrl = API_BASE_URL + '/api/companies/:id';

        return $resource( resourceUrl, {}, {
            'save': { method:'POST'},
            'patch': { method:'PATCH'},
            'delete':{ method:'DELETE'}
        });
    }
})();
