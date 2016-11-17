(function() {
  'use strict';

  angular
    .module('dataToolApp')
    .run(runBlock);

    runBlock.$inject = ['$log', 'translationHandler']

    function runBlock($log, translationHandler) {
        $log.debug('runBlock end');
        translationHandler.initialize();
    }

})();
