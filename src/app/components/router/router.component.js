(function(){
    'use strict';

    var router = {
        templateUrl: 'app/components/router/routers.html',
        bindings: {
            routers: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('router', router);
})();
