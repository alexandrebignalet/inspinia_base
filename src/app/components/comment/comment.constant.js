(function() {
    'use strict';

    angular
        .module('dataToolApp')
        .constant('COMMENT_TYPE', getCommentType());

    function getCommentType(){
        return {
            SENDING: 'sending',
            SUMMARY: 'summary'
        };
    }
})();
