/**
 * Created by aliaksei on 07/08/14.
 */

define([], function(){
    function OnFlatAdded(flat){
        var _this = this;

        _this.flat = function() {
            return flat;
        };

    }
    return OnFlatAdded;
});