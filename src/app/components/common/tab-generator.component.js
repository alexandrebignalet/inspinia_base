(function () {
    'use strict';

    var tabGenerator = {
        templateUrl: 'app/components/common/tab-generator.html',
        controller: TabController,
        controllerAs: 'vm',
        bindings: {
            tabs: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('tabGenerator', tabGenerator);

    TabController.$inject = ['$state']

    function TabController($state){
        var vm = this;

        vm.go = goToState;

        function goToState(stateName){
            $state.go(stateName);
        }
    }
})();



