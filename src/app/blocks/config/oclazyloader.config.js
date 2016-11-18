/**
 * Created by Axel on 18/11/2016.
 */
(function() {
    'use strict';

    angular
        .module('dataToolApp')
        .config(ocLazyLoaderConfig);

    ocLazyLoaderConfig.$inject = ['$ocLazyLoadProvider'];

    function ocLazyLoaderConfig($ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            debug: true,
            serie: true,
            modules: [
                {
                    name: 'datatables',
                    serie:true,
                    files: [
                        'bower_components/datatables.net-bs/js/dataTables.bootstrap.min.js',
                        'bower_components/datatables.net-bs/css/dataTables.bootstrap.min.css',
                        'bower_components/datatables.net-buttons-bs/js/buttons.bootstrap.js',
                        'bower_components/datatables.net-buttons-bs/css/buttons.bootstrap.min.css',
                        'bower_components/angular-datatables/dist/angular-datatables.min.js',
                        'bower_components/angular-datatables/dist/plugins/bootstrap/angular-datatables.bootstrap.js',
                        'bower_components/angular-datatables/dist/plugins/bootstrap/datatables.bootstrap.min.css',
                        'bower_components/angular-datatables/dist/plugins/buttons/angular-datatables.buttons.min.js'
                    ]
                },
                {
                    name: 'metisMenu',
                    files: [
                        'bower_components/metisMenu/dist/metisMenu.js',
                        'bower_components/metisMenu/dist/metisMenu.css'
                    ]
                }
            ]
        });
    }
})();
