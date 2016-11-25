(function () {
    'use strict';

    var changeLanguage = {
        templateUrl: 'app/components/language/change-language.html',
        controller: ChangeLanguageController,
        controllerAs: 'vm'
    };

    angular
        .module('dataToolApp')
        .component('changeLanguage', changeLanguage);

    ChangeLanguageController.$inject = ['LANGUAGES', '$translate', 'tmhDynamicLocale'];

    /* @ngInject */
    function ChangeLanguageController(LANGUAGES, $translate, tmhDynamicLocale) {
        var vm = this;

        vm.changeLanguage = changeLanguage;

        vm.$onInit = function(){
            vm.languages = LANGUAGES;
        };


        function changeLanguage(languageKey) {
            $translate.use(languageKey);
            tmhDynamicLocale.set(languageKey);
        }
    }
})();

