(function() {
  'use strict';

  angular
    .module('dataToolApp')
    .run(runBlock);

    runBlock.$inject = ['$log']

    function runBlock($log) {
        $log.debug('runBlock end');
    }

})();
