(function () {
    'use strict';

    var tabGenerator = {
        templateUrl: 'app/components/common/tab-generator.html',
        controller: TabController,
        controllerAs: 'vm',
        bindings: {
            tabs: '<',
            active: '<',
            loading: '<',
            onSelectElement: '&'
        }
    };

    angular
        .module('dataToolApp')
        .component('tabGenerator', tabGenerator);

    TabController.$inject = ['$state'];

    function TabController($state){
        var vm = this;

        vm.go = goToState;
        vm.onSelect = onSelect;

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

        function onSelect($event){
            vm.onSelectElement({
                $event: $event
            });
        }
    }
})();



