(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .controller('UserController', UserController);

    UserController.$inject = ['User', 'ToastrService', '$q'];

    /* @ngInject */
    function UserController(User, ToastrService, $q) {
        var vm = this;
        vm.users = null;

        activate();

        function activate(){
            User.resource().get().$promise
                .then(getUsersThen)
                .catch(getUsersCatch);

            function getUsersThen(data){
                vm.users = data;
            }

            function getUsersCatch(error){
                ToastrService.error(error, 'Impossible to retrieve Users');
                return $q.reject(error);
            }
        }
    }
})();

