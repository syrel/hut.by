/**
 * Created by aliaksei on 07/08/14.
 */

define([], function(){
    function OnExpandFlat(flat, animation, switchCategory){
        var _this = this;

        animation = (typeof animation === 'undefined' || animation === null) ? false : animation;
        switchCategory = (typeof switchCategory === 'undefined' || switchCategory === null) ? true : switchCategory;

        _this.flat = function() {
            return flat;
        };

        _this.animation = function () {
            return animation;
        };

        _this.switchCategory = function () {
            return switchCategory;
        };
    }
    return OnExpandFlat;
});