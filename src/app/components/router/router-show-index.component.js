(function(){
    'use strict';

    var routerIndex = {
        templateUrl: 'app/components/router/router-show-index.html',
        bindings: {
            routers: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('routerIndex', routerIndex);
})();
