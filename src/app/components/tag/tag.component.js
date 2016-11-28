(function(){
    'use strict';

    var tags = {
        templateUrl: 'app/components/tag/tags.html',
        controller: TagController,
        controllerAs: 'vm',
        bindings:{
            tags: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('tags', tags);

    TagController.$inject = ['Tag', 'ToastrService', '$q'];

    function TagController(Tag, ToastrService, $q) {
        var vm = this;

        vm.onSaveTag = onSaveTag;
        vm.resetForm = resetForm;
        vm.selectTag = selectTag;
        vm.onDeleteTag = onDeleteTag;

        vm.$onInit = function() {
            vm.selectedTag = Tag.init();

            vm.search = '';

            vm.pagination = {
                maxSize: 10,
                currentPage: 1,
                numPages: null,
                itemsPerPage: 30
            };
        };

        function resetForm () {
            vm.selectedTag = Tag.init();
        }

        function selectTag (tag) {
            vm.selectedTag = tag;
        }

        function onSaveTag($event){
            if(!$event.tag) { return; }

            vm.isSaving = true;

            if ($event.tag.id !== null) {
                Tag.update($event.tag)
                    .then(onPatchSuccess)
                    .catch(onError);
            } else {
                Tag.save($event.tag)
                    .then(onSaveSuccess)
                    .catch(onError);
            }

            function onPatchSuccess(tag){
                vm.isSaving = false;
                updateTagsList(tag);
                vm.selectedTag = Tag.init();
            }

            function onSaveSuccess(tag){
                vm.isSaving = false;
                vm.tags.push(tag);
                vm.selectedTag = Tag.init();
            }

            function onError(error) {
                vm.isSaving = false;
                ToastrService.error(error, 'XHR Error');
                return $q.reject(error);
            }
        }

        function onDeleteTag($event){
            if(!$event.tagId) { return; }

            vm.isSaving = true;

            Tag.delete($event.tagId)
                .then(onSuccess)
                .catch(onError);

            function onSuccess(){
                vm.isSaving = false;
                updateTagsList($event.tagId, 'delete');
            }
            function onError(error){
                vm.isSaving = false;
                ToastrService.error(error, 'XHR Error');
                return $q.reject(error);
            }
        }
        function updateTagsList(tag){
            var i;

            if (!tag.id){
                // delete tag, tag is an Id here.
                for (i = 0 ; i < vm.tags.length ; i++){
                    if (tag === vm.tags[i].id){
                        vm.tags.splice(i, 1);
                        return;
                    }
                }
            }

            for (i = 0 ; i < vm.tags.length ; i++){
                if (tag.id === vm.tags[i].id){
                    vm.tags[i].tag = tag.tag;
                    return;
                }
            }
        }
    }
})();
