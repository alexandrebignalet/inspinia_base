(function () {
    'use strict';

    var tabGenerator = {
        templateUrl: 'app/components/common/tab-generator.html',
        controller: TabController,
        controllerAs: 'vm',
        bindings: {
            tabs: '<',
            active: '<',
            loading: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('tabGenerator', tabGenerator);

    TabController.$inject = ['$state', '$scope'];

    function TabController($state, $scope){
        var vm = this;

        vm.go = goToState;


        $scope.$watch('vm.active', function(m){
            console.log(m)
        })

        function goToState($event, stateName){
            if ($event) {
                $event.preventDefault();
            }

            $state
                .go(stateName)
                .then(changeTab);
        }

        function changeTab(state){
            vm.active = state.data.activeTab;
        }
    }
})();



