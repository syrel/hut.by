/**
 * Created by aliaksei on 08/01/15.
 */

define(['dom', 'underscore'], function (Dom, _) {

    function A() {
        var _this = new Dom('<a></a>');

        _this.initialize = function () {
            _this.href('#');
        };

        _this.href = function (url) {
            if (_.isUndefined(url)) return _this.attr('href');
            _this.attr('href',url);
            return _this;
        };

        _this.initialize();

        return _this;
    }

    return A;
});