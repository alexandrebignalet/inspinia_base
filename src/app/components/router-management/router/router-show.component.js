(function () {
    'use strict';

    var routerShow = {
        templateUrl: 'app/components/router-management/router/router-show.html',
        bindings: {
            router: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('routerShow', routerShow);
})();



