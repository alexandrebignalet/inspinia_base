(function () {
    'use strict';

    var actualVolumeComment = {
        templateUrl: 'app/components/summary/actual-volume/widgets/comment.html',
        controller: ActualVolumeCommentController,
        controllerAs: 'vm',
        bindings: {
            comments: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('actualVolumeComment', actualVolumeComment);

    ActualVolumeCommentController.$inject = [];

    /* @ngInject */
    function ActualVolumeCommentController() {
        var vm = this;

        vm.formatDate = formatDate;

        function formatDate(date){
            return moment(date).format('DD/MM/YYYY');
        }
    }

})();
