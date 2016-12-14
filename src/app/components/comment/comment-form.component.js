(function () {
    'use strict';

    var commentForm = {
        templateUrl: 'app/components/comment/comment-form.html',
        controller: CommentFormController,
        controllerAs: 'vm',
        bindings: {
            comment: '<',
            isSaving: '<',
            onSaveComment: '&'
        }
    };

    angular
        .module('dataToolApp')
        .component('commentForm', commentForm);

    CommentFormController.$inject = [];

    /* @ngInject */
    function CommentFormController() {
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
