/**
 * Created by Axel on 16/11/2016.
 */
(function() {
    'use strict';

    angular
        .module('dataToolApp')
        .config(selectUiConfig);

    selectUiConfig.$inject = ['uiSelectConfig'];

    function selectUiConfig(uiSelectConfig) {
        uiSelectConfig.theme = 'bootstrap';
        uiSelectConfig.resetSearchInput = true;
        uiSelectConfig.searchEnabled = true;
    }
})();
