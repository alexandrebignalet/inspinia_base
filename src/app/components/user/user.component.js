(function () {
    'use strict';

    var users = {
        templateUrl: 'app/components/user/users.html',
        controller: UserController,
        controllerAs: 'vm',
        bindings: {
            users: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('users', users);

    UserController.$inject = ['DTOptionsBuilder'];

    /* @ngInject */
    function UserController(DTOptionsBuilder) {
        var vm = this;

        vm.$onInit = function (){
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

