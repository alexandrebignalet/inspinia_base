(function () {
    'use strict';

    var commentForm = {
        templateUrl: 'app/components/comment/comment-form.html',
        controller: CompanyFormController,
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

    CompanyFormController.$inject = [];

    /* @ngInject */
    function CompanyFormController() {
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
