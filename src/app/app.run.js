(function() {
  'use strict';

  angular
    .module('dataToolApp')
    .run(runBlock);

    runBlock.$inject = ['translationHandler', 'stateHandler'];

    function runBlock(translationHandler, stateHandler) {
        stateHandler.initialize();
        translationHandler.initialize();
    }

})();
