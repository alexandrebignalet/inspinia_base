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

    CommentSummaryDialogController.$inject = [];

    /* @ngInject */
    function CommentSummaryDialogController() {
        var vm = this;

        vm.clear = clear;
        vm.saveComment = saveComment;
        vm.$onInit = onInit;

        function clear() {

        }

        function saveComment() {

        }

        function onInit() {
            vm.comment   = vm.resolve.comment;
            vm.databases = vm.resolve.databases;
            vm.stats     = vm.resolve.stats;
        }
    }

})();
