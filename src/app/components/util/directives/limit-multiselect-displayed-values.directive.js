(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .directive('limitDisplay', limitDisplay);

    limitDisplay.$inject = [];

    /* @ngInject */
    function limitDisplay() {
        var directive = {
            restrict: 'A',
            require: 'uiSelect',
            link: link
        };
        return directive;

        function link($scope, $element, attrs, $select) {
            var itemDisplayed = true;
            var items = [];
console.log($select)
            $scope.$watch('$select.selected', function(n){
                if (angular.element('span.ui-select-match-item.btn')[0] !== undefined){
                    items.push(angular.element('span.ui-select-match-item.btn')[0]);
                }

                if (n.length > +attrs.limitDisplay){

                    angular.element('span.ui-select-match-item.btn').remove();

                    if (itemDisplayed === true){
                        angular.element('.ui-select-match').append('<span><button type="button" class="btn btn-default btn-block">'+n.length+'selected</button></span>')
                    }
                    itemDisplayed = false;
                }

                console.log(items)
            })
        }
    }
})();

