(function() {
    'use strict';

    angular
        .module('dataToolApp')
        .config(CompileConfig);

    CompileConfig.$inject = ['$compileProvider'];

    //this config allow to avoid "unsafe:" automatically add when use file:, tel:, data: or blob: in HTML

    function CompileConfig($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob|skype):/);
    }
})();
