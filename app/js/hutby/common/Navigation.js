/**
 * Created by aliaksei on 03/08/14.
 */

"use strict";
define([
    'jquery',
    'hutby/ui/pager/Pager',
    'hutby/ui/VerticalTextualFlatList',
    'hutby/ui/CategoryAccordion',
    'hutby/category/CategoryPreview',
    'hutby/category/Category',
    'hutby/common/Global',
    'hutby/announcements/OnFlatExpanded',
    'hutby/lib/Utils',
    'hutby/lib/Dictionary',
    'hutby/lib/WindowEvents'
], function(
    $,
    Pager,
    VerticalTextualFlatList,
    CategoryAccordion,
    CategoryPreview,
    Category,
    Global,
    OnFlatExpanded,
    Utils,
    Dictionary,
    WindowEvents
    ){

    function Navigation(catalog) {
        var _this = this;

        var pager = new Pager(catalog, 'hutby-flat-pager-');
        new CategoryPreview(catalog, 'hutby-flat-category-preview-box-');
        var category = new Category(catalog, 'hutby-category-');

        Global.pageContent.append(pager);
        _this.initializeEvents = function() {
            pager.showPager();
            //_this.switchToCategory(1, openFlatAutomatically);
            //_this.switchToFlat(catalog.roomFlats(1)[4]);
        };

        /////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////// M A I N ////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////


        /////////////////////////////////////////////////////////////////////////////
        ////////////////////////////// O F F C A N V A S ////////////////////////////
        /////////////////////////////////////////////////////////////////////////////
        /*_this.showOffcanvas = function () {
            Global.offCanvas.addClass('offcanvas-overlap');
        };

        _this.hideOffcanvas = function () {
            if (Global.isDisplaySmall()) setTimeout(function(){
                Global.offCanvas.removeClass('offcanvas-overlap');
            }, 0);
        };

        _this.isOffCanvasVisible = function () {
            return Global.offCanvas.hasClass('offcanvas-overlap');
        };

        _this.initializeOffcanvasEvents = function () {
            if (Global.isDisplayMedium()) _this.showOffcanvas();

            WindowEvents.addOnResizeEvent(function() {
                if (Global.isDisplayMedium()) {
                    _this.showOffcanvas();
                    _this.makeOffcanvasDefaultWidth();
                }
            });
        };

        _this.makeOffcanvasFullWidth = function () {
            if (Global.isDisplaySmall() && !Global.isDisplayMedium()) {
                Global.offCanvas.find('.left-off-canvas-menu').addClass('left-off-canvas-menu-full-width');
            }
        };

        _this.makeOffcanvasDefaultWidth = function() {
            Global.offCanvas.find('.left-off-canvas-menu').removeClass('left-off-canvas-menu-full-width');
        };

        _this.disableOffcanvasExit = function () {
            $('#exit-off-canvas').data('lol', 'true');
        };

        _this.enableOffcanvasExit = function () {
            $('#exit-off-canvas').data('lol', 'false');
        };*/
    }

    return Navigation;
});