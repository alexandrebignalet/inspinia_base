(function(){
    'use strict';

    var pricingPlan = {
        templateUrl: 'app/components/router-management/pricing-plan/pricing-plans.html',
        controller: PricingPlanController,
        controllerAs: 'vm',
        bindings: {
            pricingPlans: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('pricingPlan', pricingPlan);

    PricingPlanController.$inject = ['DTOptionsBuilder', 'DTColumnDefBuilder'];

    function PricingPlanController(DTOptionsBuilder, DTColumnDefBuilder){
        var vm = this;

        vm.$onInit = function () {
            vm.DTColumnDefs = [
                DTColumnDefBuilder.newColumnDef(5).notSortable()
            ];

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
    }
})();
