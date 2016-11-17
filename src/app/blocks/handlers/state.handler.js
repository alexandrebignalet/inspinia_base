(function() {
    'use strict';

    angular
        .module('dataToolApp')
        .factory('stateHandler', stateHandler);

    stateHandler.$inject = ['$rootScope', '$window', 'Auth', 'Principal', 'VERSION'];

    function stateHandler($rootScope, $window, Auth, Principal, VERSION) {
        return {
            initialize: initialize
        };

        function initialize() {
            $rootScope.VERSION = VERSION;

            var stateChangeStart = $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams, fromState) {
                $rootScope.toState = toState;
                $rootScope.toStateParams = toStateParams;
                $rootScope.fromState = fromState;

                // Redirect to a state with an external URL (http://stackoverflow.com/a/30221248/1098564)
                if (toState.external) {
                    event.preventDefault();
                    $window.open(toState.url, '_self');
                }

                if (Principal.isIdentityResolved()) {
                    Auth.authorize();
                }
            });

            var stateChangeSuccess = $rootScope.$on('$stateChangeSuccess',  function(event, toState) {
                $rootScope.pageTitle = toState.data.pageTitle;
                $rootScope.name = toState.name;
            });

            $rootScope.$on('$destroy', function () {
                if(angular.isDefined(stateChangeStart) && stateChangeStart !== null){
                    stateChangeStart();
                }
                if(angular.isDefined(stateChangeSuccess) && stateChangeSuccess !== null){
                    stateChangeSuccess();
                }
            });
        }
    }
})();
