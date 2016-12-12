(function () {
    'use strict';

    var databaseShow = {
        templateUrl: 'app/components/database/show/database-show.html',
        controller: DatabaseShowController,
        controllerAs: 'vm',
        bindings: {
            database: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('databaseShow', databaseShow);

    DatabaseShowController.$inject = ['Database'];

    /* @ngInject */
    function DatabaseShowController(Database) {
        var vm = this;
        vm.$onInit = onInit;

        function onInit() {
            /*getIncomesByBm();
            getLadderCampaign();
            getLadderTag();*/
        }


        function getIncomesByBm() {
            console.log('INIT 1');
            vm.incomesByBm = Database.getIncomesByBm(vm.database.id)
                .then(onSuccess)
                .catch(onError);
            function onSuccess(response) {
                console.log('FIN 1');
                return response;
            }

            function onError(error){
                console.log(error);
            }
        }

        function getLadderCampaign() {
            console.log('INIT 2');
            vm.ladderCampaign = Database.getLadder(vm.database.id,'campaign')
                .then(onSuccess)
                .catch(onError);
            function onSuccess(response) {
                console.log('FIN 2');
                return response;
            }

            function onError(error){
                console.log(error);
            }
        }

        function getLadderTag() {
            console.log('INIT 3');
            vm.ladderTag = Database.getLadder(vm.database.id,'tag')
                .then(onSuccess)
                .catch(onError);
            function onSuccess(response) {
                console.log('FIN 3');
                return response;
            }

            function onError(error){
                console.log(error);
            }
        }

    }

})();
