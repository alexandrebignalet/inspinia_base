(function () {
    'use strict';

    var pdfShow = {
        templateUrl: 'app/components/pdf/pdf-show.html',
        controller: PdfShowController,
        controllerAs: 'vm',
        bindings: {
            pdfUrl: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('pdfShow', pdfShow);

    PdfShowController.$inject = ['$scope'];

    /* @ngInject */
    function PdfShowController($scope) {
        var vm = this;

        vm.$onInit = onInit;

        function onInit(){
            $scope.pdfUrl = vm.pdfUrl;
        }
    }

})();



