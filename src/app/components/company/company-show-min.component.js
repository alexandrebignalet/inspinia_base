(function () {
    'use strict';

    var companyShowMin = {
        templateUrl: 'app/components/company/company-show-min.html',
        bindings: {
            company : '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('companyShowMin', companyShowMin);
})();



