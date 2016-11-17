(function() {
  'use strict';

  angular
    .module('dataToolApp')
    .run(runBlock);

    runBlock.$inject = ['$log', 'stateHandler']

    function runBlock($log, stateHandler) {
        stateHandler.initialize();
        $log.debug('runBlock end');
    }

})();
