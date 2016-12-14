(function () {
    'use strict';

    var commentSummaryDialog = {
        templateUrl: 'app/components/comment/summary/comment-summary-dialog.html',
        controller: CommentSummaryDialogController,
        controllerAs: 'vm',
        bindings: {
            modalInstance: '<',
            resolve: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('commentSummaryDialog', commentSummaryDialog);

    CommentSummaryDialogController.$inject = ['CommentSummary'];

    /* @ngInject */
    function CommentSummaryDialogController(CommentSummary) {
        var vm = this;

        vm.clear = clear;
        vm.saveComment = saveComment;
        vm.$onInit = onInit;

        function clear() {

        }

        function saveComment($event){
            if (!$event.comment ){ return; }

            vm.isSaving = true;

            CommentSummary.save($event.comment,vm.stats)
                .then(onSuccess)
                .catch(onError);

            function onSuccess(){
                ToastrService.success('Comment saved', 'Save success');
                vm.isSaving = false;
                vm.modalInstance.close();
            }

            function onError(){
                vm.isSaving = false;
            }
        }

        function onInit() {
            vm.comment   = vm.resolve.comment;
            vm.databases = vm.resolve.databases;
            vm.stats     = vm.resolve.stats;
        }
    }

})();
