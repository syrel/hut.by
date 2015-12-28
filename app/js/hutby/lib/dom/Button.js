/**
 * Created by aliaksei on 08/01/15.
 */

define(['dom'], function (Dom) {

    function Button() {
        var _this = new Dom('<button></button>');

        return _this;
    }

    return Button;
});