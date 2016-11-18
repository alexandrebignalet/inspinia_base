(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .factory('Database', Database);

    Database.$inject = ['$resource','API_BASE_URL'];

    function Database ($resource, API_BASE_URL) {
        var resourceUrl = API_BASE_URL + '/api/databases/:id';

        return $resource( resourceUrl, {}, {
            'save': { method:'POST'},
            'patch': { method:'PATCH'},
            'delete':{ method:'DELETE'}
        });
    }
})();
