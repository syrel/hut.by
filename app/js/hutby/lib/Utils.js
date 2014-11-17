/**
 * Created by aliaksei on 03/08/14.
 */
define(['jquery'], function ($) {
    function Utils() {}

    Utils.isUndefined = function (variable) {
        return (typeof variable === 'undefined' || variable === null);
    };

    Utils.imagePreload = function(_imagePath, _callback) {
        var image = new Image();
        image.src = _imagePath;
        image.onload = function(){
            _callback();
        }
    };

    Utils.getCssValue = function (parentElem, classes, style) {
        var elementString = '<div class="'+ classes +'"></div>';
        var $elem = $(elementString).hide().appendTo(parentElem+':first');
        var val = $elem.css(style);
        $elem.remove();
        return val;
    };

    Utils.dynamicCss = function () {
        var cssID = 'dynamicCss';
        if (Utils.isUndefined(Utils._dynamicCssElement)) {
            $('<style type="text/css" id="'+cssID+'" />').appendTo('head');
            Utils._dynamicCssElement = $('#'+cssID);
        }
        return Utils._dynamicCssElement;
    };

    Utils.$ = function(selector) {
        var tmp = $(selector);
        var selected;
        if (tmp.length !== 0) selected = tmp;
        return selected;
    };

    Utils.attachOnLoadListener = function (_elements, _callback,_eachCallback) {
        var loadCounter = 0;
        var total = _elements.length;
        _elements.on('load',function () {
            Utils.call(_eachCallback,$(this));
            loadCounter++;
            if (total == loadCounter) {
                _callback();
            }
        }).each(function () {
                if (this.complete) $(this).trigger('load');
            });
    };

    Utils.capitalizeFirstLetter = function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    Utils.call = function(_callback, params){
        if (!Utils.isUndefined(_callback)) _callback(params);
    };

    return Utils;
});