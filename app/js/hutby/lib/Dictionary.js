/**
 * Created by aliaksei on 06/08/14.
 */

define([], function() {

    function Dictionary() {
        var _this = this;

        var entries = {};

        var count = 0;

        _this.size = function() {
            return count;
        };

        _this.isEmpty = function() {
            return count === 0;
        };

        _this.keys = function() {
            var keys = [];
            _this.each(function(key){
                keys.push(key);
            });
            return keys;
        };

        _this.elements = function(){
            var elements = [];
            _this.each(function(key, value){
                elements.push(value);
            });
            return elements;
        };

        _this.get = function(key){
            return entries[key];
        };

        _this.put = function(key, value){
            var oldValue = _this.get(key);
            entries[key] = value;
            if (typeof oldValue === 'undefined') count++;
            return oldValue;
        };

        _this.remove = function (key) {
            var element = _this.get(key);
            if (typeof element !== 'undefined') {
                delete element;
                count--;
            }
        };

        _this.each = function(_callback) {
            for (var key in entries) {
                if (entries.hasOwnProperty(key)) {
                    _callback(key, entries[key]);
                }
            }
        };
    }

    return Dictionary;
});