/**
 * Created by aliaksei on 08/01/15.
 */

define(['jquery', 'hutby/lib/Utils'], function ($, Utils) {

    function Dom (html) {
        var _this = $(html);

        /**
         * Constructor, is called during object instantiation
         */
        _this.initialize = function () { /*empty*/ };

        _this.class = function (className) {
            if (Utils.isUndefined(className)) return _this.attr('class');
            _this.addClass(className);
            return _this;
        };

        // Calling constructor
        _this.initialize();

        return _this;
    }
    return Dom;
});