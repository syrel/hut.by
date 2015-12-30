/**
 * Created by aliaksei on 08/01/15.
 * v1.0.0
 */

define(['jquery'], function ($) {
    (function ($, window, document) {
        $.fn.me = function() {
            return $(this).data('me');
        };
        $.fn.findMe = function(attributes) {
            return $(this).find(attributes).me();
        };
    })($, window, document)
});

