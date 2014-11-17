/**
 * Created by aliaksei on 06/08/14.
 */

define(['jquery', 'hutby/lib/Utils'], function($, Utils){

    function FlatDescriptionViewHolder(prefix) {
        var _this = this;

        var containerID = '#'+prefix+'container';
        var photoCanvasID = '#'+prefix+'photo-canvas';

        var container;

        _this.container = function() {
            if (Utils.isUndefined(container)) container = Utils.$(containerID);
            return container;
        };

        _this.containerID = function() {
            return containerID;
        };

        _this.photoCanvasID = function() {
            return photoCanvasID;
        };
    }

    return FlatDescriptionViewHolder;
});