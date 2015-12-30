/**
 * Created by aliaksei on 05/08/14.
 */
define(['jquery', 'utils'], function($, Utils){

    function CategoryViewHolder(prefix){
        var _this = this;

        var containerID = '#'+prefix+'container';
        var flatListID = '#'+prefix+'flat-list';

        var container;
        var flatList;

        _this.container = function(){
            if (Utils.isUndefined(container)) container = Utils.$(containerID);
            return container;
        };

        _this.containerID = function(){
            return containerID;
        };

        _this.flatList = function() {
            if (Utils.isUndefined(flatList)) flatList = Utils.$(flatListID);
            return flatList;
        };

        _this.flatListID = function(){
            return flatListID;
        };
    }

    return CategoryViewHolder;
});