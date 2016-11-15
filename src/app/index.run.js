(function() {
  'use strict';

  angular
    .module('dataToolApp')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
