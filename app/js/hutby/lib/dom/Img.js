/**
 * Created by aliaksei on 08/01/15.
 */

define(['dom', 'underscore'], function (Dom, _) {

    function Img() {
        var _this = new Dom('<img>');

        _this.src = function (url) {
            if (_.isUndefined(url)) return _this.attr('src');
            _this.attr('src',url);
            return _this;
        };

        return _this;
    }

    return Img;
});