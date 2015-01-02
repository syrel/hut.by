/**
 * Created by aliaksei on 02.01.2015.
 */

define([], function(){
    function OnMediaSizeChanged(isSmall){
        var _this = this;

        isSmall = (typeof isSmall === 'undefined' || isSmall === null) ? false : isSmall;

        _this.isSmall = function() {
            return isSmall;
        };
    }
    return OnMediaSizeChanged;
});