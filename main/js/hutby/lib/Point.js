/**
 * Created by aliaksei on 03/08/14.
 */

define([], function(){

    function Point(_x , _y) {
        var _this = this;
        var x = _x;
        var y = _y;

        _this.x = function(){
            return x;
        }

        _this.y = function() {
            return y;
        }

        _this.copy = function() {
            return new Point(x ,y);
        }
    }
    return Point;
});
