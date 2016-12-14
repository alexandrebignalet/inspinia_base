(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .factory('CommentDialogService', CommentDialogService);

    CommentDialogService.$inject = ['$state', '$uibModal'];

    /* @ngInject */
    function CommentDialogService($state, $uibModal) {

        var service = {
            openDialogModal: openDialogModal
        };

        return service;

        ////////////////

        /**
         *
         * @param id sending or summary
         * @param comment
         * @param type of comment sending or summary
         */
        function openDialogModal(id, comment, type) {

            $uibModal.open({
                component: 'commentDialog',
                backdrop: 'backdrop',
                size: 'lg',
                resolve: {
                    comment: function(){
                        return comment
                    },
                    id: function(){
                        return id
                    },
                    type: function(){
                        return type
                    }
                }
            })
                .result
                .then(function () {
                        $state.go('^', null, {reload: true})
                    }, function () {
                        $state.go('^')
                    }
                );
        }
    }

})();

