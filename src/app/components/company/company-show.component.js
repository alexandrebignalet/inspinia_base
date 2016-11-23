(function () {
    'use strict';

    var companyShow = {
        templateUrl: 'app/components/company/company-show.html',
        controller: CompanyShowController,
        controllerAs: 'vm',
        bindings: {
            company: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('companyShow', companyShow);

    CompanyShowController.$inject = [];

    /* @ngInject */
    function CompanyShowController() {}
})();



