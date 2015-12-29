/**
 * Created by aliaksei on 07/08/14.
 */

define([], function(){
    function OnFlatRemoved(flat){
        var _this = this;

        _this.flat = function() {
            return flat;
        };

    }
    return OnFlatRemoved;
});