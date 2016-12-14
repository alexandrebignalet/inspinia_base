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
            })
            .state('comment-summary-create', {
                parent: 'summary.actual-volume',
                url: '/comments/create',
                params: {
                    databases: [],
                    stats: []
                },
                data: {
                    pageTitle: 'Add a comment',
                    authorities: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN']
                },
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['datepicker']);
                    }
                },
                onEnter: ['CommentSummaryDialogService', 'CommentSummary','$stateParams',
                    function(CommentSummaryDialogService, CommentSummary, $stateParams) {
                        var comment = CommentSummary.init();
                        var databases = $stateParams.databases;
                        var stats = $stateParams.stats;

                        CommentSummaryDialogService.openDialogModal(comment, databases,stats);
                    }]
        });
    }
})();
