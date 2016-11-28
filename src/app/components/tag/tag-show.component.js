(function(){
    'use strict';

    var tagShow = {
        template:   '<button class="btn btn-primary">'+
                        '<i class="fa fa-tag"></i>'+
                        '{{ $ctrl.tag.tag }}' +
                    '</button>',
        bindings:{
            tag: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('tagShow', tagShow);
})();
