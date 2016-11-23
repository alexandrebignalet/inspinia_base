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

    DatabaseController.$inject = ['DTOptionsBuilder', 'Principal', 'Database', 'ToastrService', '$translate'];

    /* @ngInject */
    function DatabaseController(DTOptionsBuilder, Principal, Database, ToastrService, $translate) {
        var vm = this;

        vm.isSaving = false;
        vm.canActivate = false;
        vm.onActivate = onActivate;

        vm.$onInit = function(){
            Principal.identity()
                .then(getUserToCheckRoles);

            function getUserToCheckRoles(){
                if (Principal.hasAnyAuthority(['ROLE_ADMIN', 'ROLE_SUPER_ADMIN']))
                {
                    vm.canActivate = true;
                }
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
                            $(win.document.body).addClass('white-bg');
                            $(win.document.body).css('font-size', '10px');

                            $(win.document.body).find('table')
                                .addClass('compact')
                                .css('font-size', 'inherit');
                        }
                    }
                ]);
        };

        function onActivate($event){
            vm.isSaving = true;

            var toastMessage = $translate.instant('database.deactivate.msg');
            if($event.database.active)
            {
                toastMessage = $translate.instant('database.activate.msg');
            }

            Database.patch($event.database)
                .then(onPatchSuccess)
                .catch(onPatchError);

            function onPatchSuccess(data){
                vm.isSaving = false;
                ToastrService.success(toastMessage);
                return data;
            }

            function onPatchError(){
                vm.isSaving = false;
            }
        }
    }

})();

