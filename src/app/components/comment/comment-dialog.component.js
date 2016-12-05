(function () {
    'use strict';

    var commentDialog = {
        templateUrl: 'app/components/comment/comment-dialog.html',
        controller: CommentDialogController,
        controllerAs: 'vm',
        bindings: {
            modalInstance: '<',
            resolve: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('commentDialog', commentDialog);

    CommentDialogController.$inject = ['CommentSending', 'CommentSummary','ToastrService', 'COMMENT_TYPE'];

    /* @ngInject */
    function CommentDialogController(CommentSending, CommentSummary, ToastrService, COMMENT_TYPE) {
        var vm = this;

        vm.clear = clear;
        vm.saveComment = saveComment;
        vm.$onInit = onInit;

        function onInit(){
            vm.comment = vm.resolve.comment;
            vm.id = vm.resolve.id;
            vm.type = vm.resolve.type;
        }

        function clear() {
            vm.modalInstance.dismiss('cancel');
        }

        function saveComment($event){
            if (!$event.comment ){ return; }

            vm.isSaving = true;

            if (vm.type === COMMENT_TYPE.SENDING){
                CommentSending.save(vm.id, $event.comment)
                    .then(onSuccess)
                    .catch(onError);
            } else {
                CommentSummary.save(vm.id, $event.comment)
                    .then(onSuccess)
                    .catch(onError);
            }


            function onSuccess(){
                ToastrService.success('Comment saved', 'Save success');
                vm.isSaving = false;
                vm.modalInstance.close();
            }

            function onError(){
                vm.isSaving = false;
            }
        }
    }

})();
