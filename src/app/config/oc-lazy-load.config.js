(function() {
  'use strict';

  angular
    .module('dataToolApp')
    .config(lazyLoadConfig);

  lazyLoadConfig.$inject = ['$ocLazyLoadProvider'];

  function lazyLoadConfig($ocLazyLoadProvider) {
    //array notation for eslint issue with $ocLazyLoad https://github.com/Gillespie59/eslint-plugin-angular/issues/223
    $ocLazyLoadProvider["config"]({
        debug: true
    });
  }
})();
