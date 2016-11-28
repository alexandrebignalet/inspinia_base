(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .directive('icheck', icheck);

    icheck.$inject = ['$timeout'];

    /* @ngInject */
    function icheck($timeout) {

        var directive = {
            restrict: 'A',
            require: 'ngModel',
            link: link
        };
        return directive;

        function link($scope, element, $attrs, ngModel) {
            return $timeout(function() {
                var value;
                value = $attrs['value'];

                $scope.$watch($attrs['ngModel'], function(){
                    angular.element(element).iCheck('update');
                });

                return angular.element(element).iCheck({
                    checkboxClass: 'icheckbox_square-green',
                    radioClass: 'iradio_square-green'

                }).on('ifChanged', function(event) {
                    if (angular.element(element).attr('type') === 'checkbox' && $attrs['ngModel']) {
                        $scope.$apply(function() {
                            return ngModel.$setViewValue(event.target.checked);
                        });
                    }
                    if (angular.element(element).attr('type') === 'radio' && $attrs['ngModel']) {
                        return $scope.$apply(function() {
                            return ngModel.$setViewValue(value);
                        });
                    }
                });
            });
        }
    }
})();

