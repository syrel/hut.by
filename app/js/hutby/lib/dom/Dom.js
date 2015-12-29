/**
 * Created by aliaksei on 08/01/15.
 */

"use strict";
define(['jquery', 'hutby/lib/Utils', 'polymorphism'], function ($, Utils) {

    function Dom (html) {
        var _this = $(html);
        var activeClass = 'active';
        var dynamicClassPrefix = 'd-';

        /**
         * Constructor, is called during object instantiation
         */
        _this.initialize = function () { _this.data('me', _this); };

        _this.class = function (className) {
            if (Utils.isUndefined(className)) return _this.attr('class');
            _this.addClass(className);
            return _this;
        };

        _this.dynamicClass = function (className) {

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

        /**
         * Don't forget to unsubscribe binding or include jquery.ui!
         * @param aValueHolder
         * @param optTransformation
         */
        _this.bindText = function(aValueHolder, optTransformation) {
            var transformation = _.isUndefined(optTransformation) ? function(obj) {return obj.toString()} : optTransformation;
            var binding = function(value){
                _this.text(transformation(value));
            };
            aValueHolder.subscribe(binding);
            _this.text(transformation(aValueHolder.value()));
            _this.removed(function(){
                aValueHolder.unsubscribe(binding);
            });
            return binding;
        };

        _this.removed = function(callback){
            _this.on('remove', callback);
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

        _this.gone = function(bool) {
            if (bool) _this.css('display','none');
            else _this.css('display','block');
            return _this;
        };

        /**
         * Overrides jquery's width() function allowing to set width value
         */

        _this.width = override(_this, _this.width, function(newWidth) {
            if (Utils.isUndefined(newWidth)) return this.super();
            _this.css('width',newWidth.toString());
            return _this;
        });

        /**
         * Overrides jquery's height() function allowing to set height value
         */
        _this.height = override(_this, _this.height, function(newHeight) {
            if (Utils.isUndefined(newHeight)) return this.super();
            _this.css('height',newHeight.toString());
            return _this;
        });

        /**
         * Overrides jquery's top() function allowing to set top value
         */
        _this.top = override(_this, _this.top, function(newTop) {
            if (Utils.isUndefined(newTop)) return this.super();
            _this.css('top',newTop.toString());
            return _this;
        });

        /**
         * Overrides jquery's left() function allowing to set left value
         */
        _this.left = override(_this, _this.left, function(newLeft) {
            if (Utils.isUndefined(newLeft)) return this.super();
            _this.css('left',newLeft.toString());
            return _this;
        });

        _this.for = function (id) {
            if (_.isUndefined(id)) return _this.attr('for');
            _this.attr('for',id);
            return _this;
        };

        _this.id = function (id) {
            if (_.isUndefined(id)) return _this.attr('id');
            _this.attr('id',id);
            return _this;
        };

        /**
         * Adds new dynamic css class with specified class name and
         * object as properties
         * @param classObject
         * @return {string} - generated class name
         */
        _this.createClass = function (classObject) {
            var array=[];
            for (var p in classObject) {
                if (classObject.hasOwnProperty(p)) {
                    array.push(p + ':' + classObject[p]);
                }
            } array.push();
            var className = dynamicClassPrefix + Utils.generateDynamicCssClassName();
            Utils.addDynamicCss('.'+className + '{'+array.join(';')+'}');
            return className;
        };

        _this.isInDom = function () {
            return _this.closest('html') === 0;
        };

        // Calling constructor
        _this.initialize();

        return _this;
    }

    return Dom;
});