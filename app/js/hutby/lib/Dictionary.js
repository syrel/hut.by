/**
 * Created by Aliaksei Syrel on 06/08/14.
 */

"use strict";
define([], function() {

    function Dictionary() {
        this._keyObjects = [];
        this._valueObjects = [];
        this._count = 0;
    }

    Dictionary.prototype = (function() {
        /**
         * Returns first occurrence index of an element. Returns
         * -1 if element is not found
         * @param array - to find index in
         * @param element - to be find
         * @returns {number} - an index of an element in array
         * @private
         */

        function indexInArray(array, element) {
            for (var i = 0, length = array.length; i < length; i++) {
                if (array[i] === element) return i;
            } return -1;
        }

        /**
         * Checks if an element exists in array
         * @param array - to check element in
         * @param element - to be checked
         * @return {boolean} - true if element exists in array,
         *                   - false otherwise
         * @private
         */
        function isExistsInArray(array, element) {
            return indexInArray(array, element) >= 0;
        }

        /**
         * Puts an element in the end of an array and returns
         * its index
         * @param array - to put in
         * @param element - to be put
         * @return {number} - an index where element was placed
         * @private
         */
        function putInArray(array, element) {
            array[array.length] = element;
            return array.length - 1;
        }

        /**
         * Puts an element in array at specified index
         * @param array - to put in
         * @param element - to be put
         * @param index - index where to put
         * @private
         */
        function putInArrayAt(array, element, index) {
            array[index] = element;
        }

        function removeFromArrayAt(array, index) {
            array.splice(index, 1);
        }

        function getFromArrayAt(array, index) {
            return array[index];
        }

        /**
         * Static API
         */
        Dictionary.removeFromArrayAt = removeFromArrayAt;
        Dictionary.indexInArray = indexInArray;

        /**
         * Public API
         */
        return {
            constructor: Dictionary,

            size : function() {
                return this._count;
            },

            isEmpty : function() {
                return this.size() === 0;
            },

            keys : function() {
                return this._keyObjects.slice(0);
            },

            elements : function(){
                return this._valueObjects.slice(0);
            },

            get : function(key){
                var value;
                var index = indexInArray(this._keyObjects, key);
                if (index >= 0) value = this._valueObjects[index];
                return value;
            },

            put : function(key, value){
                var keyIndex = this._(indexInArray)(this._keyObjects, key);
                var oldValue;
                if (keyIndex >= 0) {
                    oldValue = this._(getFromArrayAt)(this._valueObjects, keyIndex);
                    this._(putInArrayAt)(this._valueObjects, value, keyIndex);
                    return oldValue;
                }

                keyIndex = this._(putInArray)(this._keyObjects, key);
                putInArrayAt(this._valueObjects, value, keyIndex);
                this._count++;
                return oldValue;
            },

            remove : function (key) {
                var keyIndex = this._(indexInArray)(this._keyObjects, key);
                if (keyIndex < 0) return false;
                this._(removeFromArrayAt)(this._keyObjects, keyIndex);
                this._(removeFromArrayAt)(this._valueObjects, keyIndex);
                this._count--;
                return true;
            },

            each : function(_callback) {
                for (var i = 0; i < this.size(); i++) {
                    _callback(
                        this._(getFromArrayAt)(this._keyObjects, i),
                        this._(getFromArrayAt)(this._valueObjects, i));
                }
            },

            isKeyExists : function (key) {
                return this._(isExistsInArray)(this._keyObjects, key);
            },

            _:function(callback){
                var self = this;
                return function(){
                    return callback.apply(self, arguments);
                };
            }
        };
    })();

    return Dictionary;
});