/**
 * Created by aliaksei on 08/01/15.
 */

define(['dom', 'hutby/lib/Utils'], function (Dom, Utils) {

    function Img() {
        var _this = new Dom('<img>');

        _this.src = function (url) {
            if (Utils.isUndefined(url)) return _this.attr('src');
            _this.attr('src',url);
            return _this;
        };

        return _this;
    }

    return Img;
});