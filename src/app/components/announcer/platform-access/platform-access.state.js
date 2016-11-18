/**
 * Created by Axel on 18/11/2016.
 */
/**
 * Created by Axel on 17/11/2016.
 */

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
            .state('pplatform-access', {
                parent: 'announcer',
                url: '/platform-acces',
                data: {
                    pageTitle: 'Platform Access'
                },
                views: {
                    'content@': {
                        templateUrl: 'app/components/announcer/platform-access/platform-access.html',
                        controller: 'PlatformAccessController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                        $translatePartialLoader.addPart('announcer');
                        return $translate.refresh();
                    }]
                }
            });
    }
})();
