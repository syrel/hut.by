/**
 * Created by aliaksei on 08/01/15.
 */

define(['dom'], function (Dom) {

    function Label() {
        var _this = new Dom('<label></label>');

        _this.for = function (id) {
            if (_.isUndefined(id)) return _this.attr('for');
            _this.attr('for',id);
            return _this;
        };

        return _this;
    }

    return Label;
});