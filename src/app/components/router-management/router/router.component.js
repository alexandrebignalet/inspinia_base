(function(){
    'use strict';

    var router = {
        templateUrl: 'app/components/router-management/router/routers.html',
        controller: RouterController,
        controllerAs: 'vm',
        bindings: {
            routers: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('router', router);

    RouterController.$inject = ['DTOptionsBuilder', 'DTColumnDefBuilder'];

    function RouterController(DTOptionsBuilder, DTColumnDefBuilder){
        var vm = this;

        vm.$onInit = function(){
            vm.DTColumnDefs = [
                DTColumnDefBuilder.newColumnDef(4).notSortable()
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
        }
    }
})();
