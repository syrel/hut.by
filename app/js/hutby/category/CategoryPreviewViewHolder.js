/**
 * Created by aliaksei on 03/08/14.
 */
define(['jquery', 'utils'], function($, Utils){

    function CategoryPreviewViewHolder(prefix){
        var _this = this;

        var containerID = '#'+prefix+'container';
        var scrollPaneID = '#'+prefix+'scrollpane';
        var jspPaneID = '.jspPane';
        var jspContainerID = '.jspContainer';

        var container;
        var scrollPane;

        _this.container = function(){
            if (Utils.isUndefined(container)) container = Utils.$(containerID);
            return container;
        };

        _this.containerID = function(){
            return containerID;
        };

        _this.scrollPane = function() {
            if (Utils.isUndefined(scrollPane)) scrollPane = Utils.$(scrollPaneID);
            return scrollPane;
        };

        _this.scrollPaneID = function(){
            return scrollPaneID;
        };

        _this.jspPane = function(){
            return _this.scrollPane().find(jspPaneID);
        }

        _this.jspContainer = function() {
            return _this.scrollPane().find(jspContainerID);
        }
    };

    return CategoryPreviewViewHolder;
});