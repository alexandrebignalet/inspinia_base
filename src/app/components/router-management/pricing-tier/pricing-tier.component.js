(function(){
    'use strict';

    var pricingTier = {
        templateUrl: 'app/components/router-management/pricing-tier/pricing-tiers.html',
        controller: PricingTierController,
        controllerAs: 'vm',
        bindings: {
            pricingTiers: '<',
            onShowPricingTier: '&'
        }
    };

    angular
        .module('dataToolApp')
        .component('pricingTier', pricingTier);

    PricingTierController.$inject = ['DTOptionsBuilder', 'DTColumnDefBuilder'];

    function PricingTierController(DTOptionsBuilder, DTColumnDefBuilder){
        var vm = this;

        vm.showPricingTier = showPricingTier;

        vm.$onInit = function () {
            vm.onShowPricingTier({ $event: { pricingTier: vm.pricingTiers[0] } });

            vm.DTColumnDefs = [
                DTColumnDefBuilder.newColumnDef(6).notSortable()
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

        function showPricingTier(pricingTier){
            vm.onShowPricingTier({
                $event: {
                    pricingTier: pricingTier
                }
            });
        }
    }
})();
