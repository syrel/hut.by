/**
 * Created by aliaksei on 07/08/14.
 */

define([], function(){
    function OnFlatCollapsed(flat, animation){
        var _this = this;

        animation = (typeof animation === 'undefined' || animation === null) ? false : animation;

        _this.flat = function() {
            return flat;
        };

        _this.animation = function () {
            return animation;
        };
    }
    return OnFlatCollapsed;
});