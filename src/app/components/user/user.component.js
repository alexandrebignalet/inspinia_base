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

    UserController.$inject = [];

    /* @ngInject */
    function UserController() {
        var vm = this;
    }
})();

