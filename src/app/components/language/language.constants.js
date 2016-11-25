/**
 * Created by Axel on 16/11/2016.
 */
(function () {
    'use strict';

    angular
        .module('dataToolApp')

        /*
         Languages codes are ISO_639-1 codes, see http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
         They are written in English to avoid character encoding issues (not a perfect solution)
         */
        .constant('LANGUAGES', getLanguages());

        function getLanguages(){
            return [
                'en',
                'fr',
                'es'
            ]
        }
})();
