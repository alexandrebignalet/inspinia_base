(function() {
    'use strict';

    angular
        .module('dataToolApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {

        $stateProvider
            .state('comment-sending-create', {
                parent: 'invoice-request',
                url: '/sendings/{id}/comments/create',
                data: {
                    pageTitle: 'Add a comment',
                    authorities: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN']
                },
                onEnter: ['CommentDialogService', 'CommentSending', 'COMMENT_TYPE', '$stateParams',
                    function(CommentDialogService, CommentSending, COMMENT_TYPE, $stateParams) {
                        var comment = CommentSending.init();
                        CommentDialogService.openDialogModal($stateParams.id, comment, COMMENT_TYPE.SENDING);
                    }]
            });
    }
})();
