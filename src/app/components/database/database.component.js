(function () {
    'use strict';

    var databases = {
        templateUrl: 'app/components/database/databases.html',
        controller: DatabaseController,
        controllerAs: 'vm',
        bindings: {
            databases: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('databases', databases);

    DatabaseController.$inject = ['DTOptionsBuilder'];

    /* @ngInject */
    function DatabaseController(DTOptionsBuilder) {
        var vm = this;

        this.$onInit = function(){
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
                            $(win.document.body).addClass('white-bg');
                            $(win.document.body).css('font-size', '10px');

                            $(win.document.body).find('table')
                                .addClass('compact')
                                .css('font-size', 'inherit');
                        }
                    }
                ]);
        }
    }

})();

