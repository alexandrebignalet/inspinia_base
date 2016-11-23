(function () {
    'use strict';

    var company = {
        templateUrl: 'app/components/company/companies.html',
        controller: CompanyController,
        controllerAs: 'vm',
        bindings: {
            companies : '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('company', company);

    CompanyController.$inject = ['DTOptionsBuilder'];

    /* @ngInject */
    function CompanyController(DTOptionsBuilder) {
        var vm = this;
        vm.showCompany = showCompany;
        vm.showedCompany = {};

        vm.$onInit = function() {
            if( vm.companies.length > 0) {
                vm.showedCompany = vm.companies[0]
            }

            vm.dtOptions = DTOptionsBuilder.newOptions()
                .withDOM('<"html5buttons"B>lfrtip')
                .withBootstrap()
                .withButtons([
                    {extend: 'copy'},
                    {extend: 'csv'},
                    {extend: 'excel', title: 'ExampleFile'},
                    {extend: 'pdf', title: 'ExampleFile'},
                    {extend: 'print',
                        customize: function (win){
                            angular.element(win.document.body).addClass('white-bg');
                            angular.element(win.document.body).css('font-size', '10px');

                            angular.element(win.document.body).find('table')
                                .addClass('compact')
                                .css('font-size', 'inherit');
                        }
                    }
                ]);
        };

        function showCompany(company) {
            vm.showedCompany = company;
        }


    }

})();



