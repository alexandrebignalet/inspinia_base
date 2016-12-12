(function () {
    'use strict';

    var actualVolumeComment = {
        templateUrl: 'app/components/summary/actual-volume/widgets/actual-volume-comment.html',
        controller: ActualVolumeCommentController,
        controllerAs: 'vm',
        bindings: {
        }
    };

    angular
        .module('dataToolApp')
        .component('actualVolumeComment', actualVolumeComment);

    ActualVolumeCommentController.$inject = [];

    /* @ngInject */
    function ActualVolumeCommentController() {
        var vm = this;

    }

})();
