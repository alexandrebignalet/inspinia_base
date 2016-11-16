/**
 * Created by Axel on 16/11/2016.
 */
(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .controller('DtoolLanguageController', DtoolLanguageController);

    DtoolLanguageController.$inject = ['$translate', 'DtoolLanguageService', 'tmhDynamicLocale'];

    /* @ngInject */
    function DtoolLanguageController($translate, DtoolLanguageService, tmhDynamicLocale) {
        var vm = this;

        vm.changeLanguage = changeLanguage;
        vm.languages = null;

        DtoolLanguageService.getAll().then(function(languages){
            vm.languages = languages
        });

        function changeLanguage(languageKey) {
            $translate.use(languageKey);
            tmhDynamicLocale.set(languageKey);
        }

    }

})();

