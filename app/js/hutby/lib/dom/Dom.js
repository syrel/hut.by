/**
 * Created by aliaksei on 08/01/15.
 */

define(['jquery', 'hutby/lib/Utils', 'polymorphism'], function ($, Utils) {

    function Dom (html) {
        var _this = $(html);
        var activeClass = 'active';

        /**
         * Constructor, is called during object instantiation
         */
        _this.initialize = function () { _this.data('me', _this); };

        _this.class = function (className) {
            if (Utils.isUndefined(className)) return _this.attr('class');
            _this.addClass(className);
            return _this;
        };

        _this.active = function (bool) {
            if (Utils.isUndefined(bool)) return _this.hasClass(_this.activeClass());
            if (bool) _this.class(_this.activeClass());
            else _this.removeClass(_this.activeClass());
            return _this;
        };

        _this.activeClass = function (className) {
            if (Utils.isUndefined(className)) return activeClass;
            activeClass = className;
            return _this;
        };

        _this.add = function (domElement) {
            _this.append(domElement);
            return _this;
        };

        _this.text = function (string) {
            if (Utils.isUndefined(string)) return _this.html();
            _this.html(string);
            return _this;
        };

        _this.textAlignLeft = function () {
           _this.css('text-align','left');
            return _this;
        };

        _this.textAlignCenter = function () {
            _this.css('text-align','center');
            return _this;
        };

        _this.hidden = function(bool) {
            if (Utils.isUndefined(bool)) return !_this.is(':visible');
            if (bool) _this.class(_this.css('visibility','hidden'));
            else _this.removeClass(_this.css('visibility','visible'));
            return _this;
        };

        _this.visible = function(bool) {
            if (Utils.isUndefined(bool)) return !_this.hidden();
            return _this.hidden(!bool);
        };

        /**
         * Overrides jquery's width() function allowing to set width value
         */

        _this.width = override(_this, _this.width, function(newWidth) {
            if (Utils.isUndefined(newWidth)) return this.super();
            _this.css('width',newWidth.toString());
            return _this;
        });

        // Calling constructor
        _this.initialize();

        return _this;
    }

    return Dom;
});