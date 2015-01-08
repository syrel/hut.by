/**
 * Created by aliaksei on 08/01/15.
 */

define(['dom', 'hutby/lib/Utils'], function (Dom, Utils) {

    function A() {
        var _this = new Dom('<a></a>');

        _this.href = function (url) {
            if (Utils.isUndefined(url)) return _this.attr('href');
            _this.attr('href',url);
            return _this;
        };

        return _this;
    }

    return A;
});