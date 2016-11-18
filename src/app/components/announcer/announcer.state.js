/**
 * Created by Axel on 17/11/2016.
 */
(function() {
    'use strict';

    angular
        .module('dataToolApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {

        $stateProvider
            .state('announcer', {
                parent: 'components',
                url: '/announcer',
                data: {
                    pageTitle: 'Announcer'
                },
                views: {
                    'content@': {
                        template: '<announcer announcers="$resolve.data"></announcer>'
                    }
                },
                resolve: {

                    data: [
                        'Announcer', function(Announcer) {
                            return Announcer.get({

                            }).$promise.then(function(data){
                                return data.announcers;
                            }).catch(function(error){
                                console.log(error);
                            })
                        }
                    ],
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                        $translatePartialLoader.addPart('announcer');
                        return $translate.refresh();
                    }],
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'datatables'
                        ]);
                    }
                }
            });
    }
})();
