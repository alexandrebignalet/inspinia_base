(function () {
    'use strict';

    var entityActivate = {
        template: '<div>'+
        '<button type="button"' +
        'ng-disabled="vm.isSaving" ng-click="vm.update()"' +
        ' ng-class="{' +
        '\'btn btn-primary btn-circle\': vm.entity.active,' +
        '\'btn btn-danger btn-circle btn-outline\': !vm.entity.active' +
        '}">' +
        '<span class="fa fa-power-off"></span>'+
        '</button>'+
        '</div>',

        controller: EntityActivateController,
        controllerAs: 'vm',
        bindings: {
            entity: '<',
            authorize: '<',
            onActivate: '&',
            isSaving: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('entityActivate', entityActivate);

    EntityActivateController.$inject = [];

    /* @ngInject */
    function EntityActivateController() {
        var vm = this;
        vm.update = update;

        vm.$onInit = function() {
            console.log(vm.entity);
        }

        vm.$onChanges = function(changes) {
            if (changes.entity) {
                vm.entity = Object.assign({}, vm.entity);
            }
        };

        function update(){
            if (!vm.authorize) return;

            vm.entity.active = !vm.entity.active;

            vm.onActivate({
                $event: {
                    entity: vm.entity
                }
            });
        }
    }

})();



