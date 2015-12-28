/**
 * Created by aliaksei on 28/12/15.
 */

"use strict";
define([], function () {

    /**
     *
     * @constructor {ValueHolder}
     * @class {ValueHolder}
     */
    function ValueHolder(defaultValue) {
        var _this = this;

        var value = (typeof defaultValue == "undefined") ? null : defaultValue;
        var subscriptions = [];

        _this.value = function(_value) {
            if (typeof _value == "undefined") return value;
            if (value === _value) return _this;
            var oldValue = value;
            value = _value;
            for (var i = 0; i < subscriptions.length; i++) {
                subscriptions[i](value, oldValue);
            }
            return _this;
        };

        _this.subscribe = function (callback) {
            subscriptions.push(callback);
        };

        _this.unsubscribe = function (callback) {
            for(var i = subscriptions.length; i--;) {
                if(subscriptions[i] === callback) {
                    subscriptions.splice(i, 1);
                }
            }
        };
    }

    return ValueHolder;
});