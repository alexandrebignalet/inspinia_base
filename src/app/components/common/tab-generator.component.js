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

    TabController.$inject = ['$state', '$rootScope']

    function TabController($state, $rootScope){
        var vm = this;

        vm.go = goToState;

        function goToState(stateName){
            $state.go(stateName);
        }

        $rootScope.$watch('transition', function(n){
            vm.loading = n;
        })
    }
})();



