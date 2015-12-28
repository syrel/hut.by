/**
 * Created by aliaksei on 08/01/15.
 */

define(['dom'], function (Dom) {

    function Input() {
        var _this = new Dom('<input>');

        _this.type = function (type) {
            if (_.isUndefined(type)) return _this.attr('type');
            _this.attr('type',type);
            return _this;
        };

        _this.id = function (id) {
            if (_.isUndefined(id)) return _this.attr('id');
            _this.attr('id',id);
            return _this;
        };

        return _this;
    }

    return Input;
});