(function(){
    'use strict';

    angular
        .module('dataToolApp')
        .filter('numberLocaleTransformer', function ($filter) {
            return function (input, fixed) {

                if (typeof input !== typeof "") {
                    input = $filter("number")(input, fixed);
                }

                var res = "";
                angular.forEach(input, function (value) {
                    if (value === ",") {
                        value = " ";
                    }
                    if (value === ".") {
                        value = ","
                    }
                    res += value;
                });
                return res;
            };
        });
})();
