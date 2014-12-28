/**
 * Created by aliaksei on 28.12.2014.
 */

define([], function(){
    function OnCategoryCollapsed(rooms, animation){
        var _this = this;

        animation = (typeof animation === 'undefined' || animation === null) ? false : animation;

        _this.rooms = function() {
            return rooms;
        };

        _this.animation = function () {
            return animation;
        };
    }
    return OnCategoryCollapsed;
});