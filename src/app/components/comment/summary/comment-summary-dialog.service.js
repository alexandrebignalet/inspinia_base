(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .factory('CommentSummaryDialogService', CommentSummaryDialogService);

    CommentDialogService.$inject = ['$state', '$uibModal'];

    /* @ngInject */
    function CommentSummaryDialogService($state, $uibModal) {

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
        function openDialogModal(comment,databases,stats) {

            $uibModal.open({
                component: 'commentSummaryDialog',
                backdrop: 'backdrop',
                size: 'lg',
                resolve: {
                    comment: function(){
                        return comment
                    },
                    databases: function(){
                        return databases
                    },
                    stats: function(){
                        return stats
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

