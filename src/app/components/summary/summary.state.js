(function() {
    'use strict';

    angular
        .module('dataToolApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {

        $stateProvider
            .state('summary', {
                parent: 'components',
                url: '/summary',
                data: {
                    pageTitle: 'Summary',
                    authorities: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_SUPER_ADMIN']
                },
                views: {
                    'content@': {
                        template: '<summary tranches="$resolve.tranches.data"></summary>'
                    }
                },
                resolve: {
                    tranches: [
                        'SummaryStat', function (SummaryStat) {
                            return SummaryStat.getTranches();
                        }
                    ],
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                        $translatePartialLoader.addPart('summary');
                        return $translate.refresh();
                    }],
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['angular-daterangepicker','datatables','immutable']);
                    }
                }
            })
            $stateProvider
                .state('summary.actual-volume', {
                    parent: 'summary',
                    url: '/actual-volume',
                    data: {
                        pageTitle: 'Summary',
                        authorities: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_SUPER_ADMIN']
                    },
                    views: {
                        'content@': {
                            template: '<actual-volume></actual-volume>'
                        }
                    },
                    resolve: {
                        mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                            $translatePartialLoader.addPart('summary');
                            return $translate.refresh();
                        }],
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load(['angular-daterangepicker','datatables','immutable','chartJs']);
                        }
                    }
                })
            ;
    }
})();
