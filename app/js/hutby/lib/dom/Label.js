/**
 * Created by aliaksei on 08/01/15.
 */

define(['dom'], function (Dom) {

    function Label() {
        var _this = new Dom('<label></label>');

        return _this;
    }

    return Label;
});