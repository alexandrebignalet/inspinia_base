(function () {
    'use strict';

    var summary = {
        templateUrl: 'app/components/summary/summary.html',
        controller: SummaryController,
        controllerAs: 'vm',
        bindings: {

        }
    };

    angular
        .module('dataToolApp')
        .component('summary', summary);

    SummaryController.$inject = [];

    /* @ngInject */
    function SummaryController() {
        var vm = this;

        vm.$onInit = function(){

        };




    }

})();

