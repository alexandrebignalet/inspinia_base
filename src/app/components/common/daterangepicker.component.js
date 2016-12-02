(function () {
    'use strict';

    var dateRangePicker = {
        templateUrl: 'app/components/common/daterangepicker.html',
        controller: DateRangePickerController,
        controllerAs: 'vm',
        bindings: {
            onChangeDates: '&'
        }
    };

    angular
        .module('dataToolApp')
        .component('dateRangePicker', dateRangePicker);

    DateRangePickerController.$inject = [];

    /* @ngInject */
    function DateRangePickerController() {
        var vm = this;
        vm.dates = {};
        vm.options = {};

        // TODO : RANGES AND TRANSLATION AND CUSTOM DISPLAY

        vm.$onInit = function(){
            vm.dates = {
                startDate: moment().startOf('month').subtract(3, 'months'),
                endDate: moment().subtract(3, 'months')
            };

            vm.options = {
                eventHandlers: {
                    'apply.daterangepicker' : onApply
                }
            };
        };

        function onApply(ev, picker) {
            vm.onChangeDates({
                $event: {
                    dates: vm.dates
                }
            });
        }

    }

})();

