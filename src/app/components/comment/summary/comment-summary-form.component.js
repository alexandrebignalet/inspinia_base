(function () {
    'use strict';

    var commentSummaryForm = {
        templateUrl: 'app/components/comment/summary/comment-summary-form.html',
        controller: CommentSummaryFormController,
        controllerAs: 'vm',
        bindings: {
            comment: '<',
            databases: '<',
            isSaving: '<',
            onSaveComment: '&'
        }
    };

    angular
        .module('dataToolApp')
        .component('commentSummaryForm', commentSummaryForm);

    CommentSummaryFormController.$inject = [];

    /* @ngInject */
    function CommentSummaryFormController() {
        var vm = this;

        vm.onSubmit = onSubmit;

        function onSubmit() {
            vm.onSaveComment({
                $event: {
                    comment: vm.comment
                }
            });
        }
    }

})();
