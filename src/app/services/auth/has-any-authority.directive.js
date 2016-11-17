(function() {
    'use strict';

    angular
        .module('dataToolApp')
        .directive('hasAnyAuthority', hasAnyAuthority);

    hasAnyAuthority.$inject = ['Principal'];

    function hasAnyAuthority(Principal) {
        var directive = {
            restrict: 'A',
            link: linkFunc
        };

        return directive;

        function linkFunc(scope, element, attrs) {
            var roles = attrs.hasAnyAuthority.replace(/\s+/g, '').split(',');

            var setVisible = function () {
                    element.removeClass('hidden');
                },
                setHidden = function () {
                    element.addClass('hidden');
                },
                defineVisibility = function (reset) {
                    var result;
                    if (reset) {
                        setVisible();
                    }

                    result = Principal.hasAnyAuthority(roles);
                    if (result) {
                        setVisible();
                    } else {
                        setHidden();
                    }
                };

            if (roles.length > 0) {
                defineVisibility(true);

                scope.$watch(function() {
                    return Principal.isAuthenticated();
                }, function() {
                    defineVisibility(true);
                });
            }
        }
    }
})();
