/**
 * Created by aliaksei on 28.12.2014.
 */

define([], function(){
    function OnCategoryPreviewShow(rooms, anchor){
        var _this = this;

        _this.rooms = function() {
            return rooms;
        };

        _this.anchor = function () {
            return anchor;
        };
    }
    return OnCategoryPreviewShow;
});