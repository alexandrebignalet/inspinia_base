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

        vm.$onInit = function (){
            console.log('init user', vm)
        };

        vm.$onChanges = function(changes){
            console.log('changes on user', changes)
        };

        vm.$onDestroy = function(){
            console.log('destroy user')
        }
    }
})();

