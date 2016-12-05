(function () {
    'use strict';

    var widgetDatabaseSections = {
        templateUrl: 'app/components/database/show/widgets/widget-database-sections.html',
        controller: WidgetDatabaseSectionsController,
        controllerAs: 'vm',
        bindings: {

        }
    };

    angular
        .module('dataToolApp')
        .component('widgetDatabaseSections', widgetDatabaseSections);

    WidgetDatabaseSectionsController.$inject = [];

    /* @ngInject */
    function WidgetDatabaseSectionsController() {
        var vm = this;
        vm.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
        vm.data = [300, 500, 100];

    }

})();
