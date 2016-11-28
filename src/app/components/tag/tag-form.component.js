(function(){
    'use strict';

    var tagForm = {
        templateUrl: 'app/components/tag/tag-form.html',
        controller: TagFormController,
        controllerAs: 'vm',
        bindings: {
            tag: '<',
            isSaving: '<',
            onSaveTag: '&',
            reset: '&',
            onDeleteTag: '&'
        }
    };

    angular
        .module('dataToolApp')
        .component('tagForm', tagForm);

    TagFormController.$inject = [];

    function TagFormController() {
        var vm = this;

        vm.onSubmit = onSubmit;
        vm.clear = clear;
        vm.onSubmitDeleteTag = onSubmitDeleteTag;

        function onSubmit() {
            vm.onSaveTag({
                $event: {
                    tag: vm.tag
                }
            });
        }

        function clear () {
            vm.reset({$event:{}});
        }

        function onSubmitDeleteTag(){
            vm.onDeleteTag({
                $event: {
                    tagId: vm.tag.id
                }
            });
        }
    }
})();
