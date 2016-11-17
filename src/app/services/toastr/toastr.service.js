(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .factory('ToastrService', ToastrService);

    ToastrService.$inject = ['$rootScope'];

    /* @ngInject */
    function ToastrService($rootScope) {
        var service = {
            success: success,
            error: error
        };

        var cleanHttpErrorListener = $rootScope.$on('dataToolApp.httpError', onHttpError);
        $rootScope.$on('$destroy', onDestroy);

        return service;

        ////////////////

        function success(message, title) {
            return toastr['success'](message, title);
        }

        function error(message, title) {
            return toastr['error'](message, title);
        }

        function onHttpError(event, httpResponse){
            event.stopPropagation();
            switch (httpResponse.status) {
                // connection refused, server not reachable
                case 0:
                    error('Server not reachable','error.server.not.reachable');
                    break;

                case 400:
                    error('Validation failed', 'Bad request')
                    break;

                case 404:
                    error('Not found', httpResponse.config.url);
                    break;

                default:
                    if (httpResponse.data && httpResponse.data.message) {
                        error(httpResponse.data.message);
                    } else {
                        error(angular.toJson(httpResponse));
                    }
            }
        }

        function onDestroy(){
            if(angular.isDefined(cleanHttpErrorListener) && cleanHttpErrorListener !== null){
                cleanHttpErrorListener();
            }
        }
    }

})();

