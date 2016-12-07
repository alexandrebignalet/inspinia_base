(function() {
  'use strict';

  angular
    .module('dataToolApp')
    .run(runBlock);

    runBlock.$inject = ['translationHandler', 'stateHandler', 'NodeSocket'];

    function runBlock(translationHandler, stateHandler, NodeSocket) {
        stateHandler.initialize();
        translationHandler.initialize();
        NodeSocket.connect();
    }

})();
