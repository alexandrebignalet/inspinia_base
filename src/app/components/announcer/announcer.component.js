(function () {
    'use strict';

    var announcer = {
        templateUrl: 'app/components/announcer/announcers.html',
        controller: AnnouncerController,
        controllerAs: 'vm',
        bindings: {
            announcers : '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('announcer', announcer);

    AnnouncerController.$inject = ['DTOptionsBuilder', 'DTColumnDefBuilder','ToastrService', '$translate', 'Announcer'];

    /* @ngInject */
    function AnnouncerController(DTOptionsBuilder, DTColumnDefBuilder, ToastrService, $translate, Announcer) {
        var vm = this;
        vm.isSaving = false;
        vm.onActivate = onActivate;
        vm.showAnnouncer = showAnnouncer;

        ////////////////

        vm.$onInit = function () {

            vm.DTColumnDefs = [
                DTColumnDefBuilder.newColumnDef(5).notSortable()
            ];
        };

        vm.$onInit = function() {
            if( vm.announcers.length > 0) {
                vm.showedAnnouncer = vm.announcers[0];
            }
        };

        function showAnnouncer(announcer) {
            vm.showedAnnouncer = announcer;
        }


        function onActivate($event){
            vm.isSaving = true;

            var toastMessage = $translate.instant('announcer.deactivate.msg');
            if($event.entity.active)
            {
                toastMessage = $translate.instant('announcer.activate.msg');
            }

            Announcer.update($event.entity)
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



