/**
 * Created by aliaksei on 06/08/14.
 */

define([], function() {

    function Dictionary() {
        var _this = this;

        var keyObjects = [];
        var valueObjects = [];

        var count = 0;

        /**
         *
         * @param array
         * @param element
         * @returns {number} - 1 if there is no element in array
         */
        Dictionary._indexInArray = function(array, element) {
            for (var i = 0, length = array.length; i < length; i++) {
                if (array[i] === element) {
                    return i;
                }
            }
            return -1;
        };

        Dictionary._isExistsInArray = function(array, element) {
            return Dictionary._indexInArray(array, element) >= 0;
        };

        Dictionary._putInArray = function (array, element) {
            array[array.length] = element;
            return array.length - 1;
        };

        Dictionary._putInArrayAt = function(array, element, index) {
            array[index] = element;
        };

        Dictionary._removeFromArrayAt = function(array, index) {
            array.splice(index, 1);
        };

        Dictionary._getFromArrayAt = function(array, index) {
            return array[index];
        };


        _this.size = function() {
            return count;
        };

        _this.isEmpty = function() {
            return count === 0;
        };

        _this.keys = function() {
            return keyObjects.slice(0);
        };

        _this.elements = function(){
            return valueObjects.slice(0);
        };

        _this.get = function(key){
            var value;
            var index = Dictionary._indexInArray(keyObjects, key);
            if (index >= 0) value = valueObjects[index];
            return value;
        };

        _this.put = function(key, value){
            var keyIndex = Dictionary._indexInArray(keyObjects, key);
            var oldValue;
            if (keyIndex >= 0) {
                oldValue = Dictionary._getFromArrayAt(valueObjects, keyIndex);
                Dictionary._putInArrayAt(valueObjects, value, keyIndex);
                return oldValue;
            };

            keyIndex = Dictionary._putInArray(keyObjects, key);
            Dictionary._putInArrayAt(valueObjects, value, keyIndex);
            count++;
            return oldValue;
        };

        _this.remove = function (key) {
            var keyIndex = Dictionary._indexInArray(keyObjects, key);
            if (keyIndex < 0) return false;

            Dictionary._removeFromArrayAt(keyObjects, keyIndex);
            Dictionary._removeFromArrayAt(valueObjects, keyIndex);
            count--;
            return true;
        };

        _this.each = function(_callback) {
            for (var i = 0; i < count; i++) {
                _callback(Dictionary._getFromArrayAt(keyObjects, i), Dictionary._getFromArrayAt(valueObjects, i));
            }
        };

        _this.isKeyExists = function (key) {
            return Dictionary._isExistsInArray(keyObjects, key);
        };
    }

    return Dictionary;
});