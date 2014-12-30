/**
 * Created by aliaksei on 03/08/14.
 */

"use strict";
define([
    'jquery',
    'hutby/main/Pager',
    'hutby/ui/VerticalTextualFlatList',
    'hutby/ui/CategoryAccordion',
    'hutby/category/CategoryPreview',
    'hutby/category/Category',
    'hutby/common/Global',
    'hutby/announcements/OnFlatExpanded',
    'hutby/lib/Utils',
    'hutby/lib/Dictionary',
    'hutby/lib/WindowEvents'
], function($, Pager, VerticalTextualFlatList, CategoryAccordion, CategoryPreview, Category, Global, OnFlatExpanded, Utils, Dictionary, WindowEvents){

    function Navigation(catalog) {
        var _this = this;

        var pager = new Pager(catalog, 'hutby-flat-pager-');
        var categoryPreview = new CategoryPreview(catalog, 'hutby-flat-category-preview-box-');
        var category = new Category(catalog, 'hutby-category-');

        var openFlatAutomatically = true;

        _this.initializeEvents = function() {
            _this.bindAnnouncements();
            _this.initializeOffcanvasEvents();

            _this.initializeAccordions();
            _this.bindHeaderLink();
            _this.switchToMain();
            pager.show();
            //_this.switchToCategory(1, openFlatAutomatically);
            //_this.switchToFlat(catalog.roomFlats(1)[4]);
        };

        /////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////// M A I N ////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////
        _this.switchToMain = function() {
            //_this.makeAllLinksInactive();
            _this.showOffcanvas();
            //_this.collapseAllAccordions();
            _this.makeOffcanvasFullWidth();
            _this.disableOffcanvasExit();
            //pager.show();
        };

        _this.bindHeaderLink = function () {
            Global.headerLink.click(function(e){
                e.preventDefault();
                if (catalog.isCategoryExpanded())
                    catalog.collapseCategory(true);
            });
        };


        /////////////////////////////////////////////////////////////////////////////
        /////////////////////////////// C A T E G O R Y /////////////////////////////
        /////////////////////////////////////////////////////////////////////////////
        _this.switchToCategory = function(_rooms, openFlat) {
            openFlat = Utils.isUndefined(openFlat) ? false : openFlat;

            _this.disableOffcanvasExit();

            categoryPreview.hide(0.1,0, true);
            category.show(_rooms, false, openFlat);
            //pager.hide(_this.initializeCategoryEvents);
        };

        _this.initializeCategoryEvents = function(){
            _this.bindCategoryHeaderLink();
        };

        _this.bindCategoryHeaderLink = function () {
            Global.headerLink.click(function(e){
                e.preventDefault();
                catalog.collapseCategory(true);
            });
        };

        /////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////// F L A T  ///////////////////////////////
        /////////////////////////////////////////////////////////////////////////////

        _this.switchToFlat = function(flat, animation, switchCategory) {
            _this.makeOffcanvasDefaultWidth();
            _this.enableOffcanvasExit();

            animation = Utils.isUndefined(animation) ? false : animation;
            switchCategory = Utils.isUndefined(switchCategory) ? true : switchCategory;

            if (switchCategory) _this.switchToCategory(flat.getRooms(), false);
            //_this.makeAllAccordionFlatInactive();
            //_this.makeAccordionFLatActive(flat);
            category.expandFlat(flat, animation);
        };

        /////////////////////////////////////////////////////////////////////////////
        /////////////////////////// A N N O U N C E M E N T S ///////////////////////
        /////////////////////////////////////////////////////////////////////////////
        _this.bindAnnouncements = function () {
            catalog.announcer().onSendTo(OnFlatExpanded, _this.onExpandFlat, _this);
        };

        _this.onExpandFlat = function (ann) {
            _this.switchToFlat(ann.flat(), ann.animation(), ann.switchCategory());
        };

        /////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////// L I N K S ////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////
        /**
         * Initializes corresponding accordions for each category
         */
        _this.initializeAccordions = function () {
            var root = $('dl.accordion');
            $.each(catalog.possibleRooms(), function(index, each){
                root.append(new CategoryAccordion(catalog, each));
            });
        };

        _this.collapseFlats = function(rooms) {
            $.each(catalog.flats(rooms), function(index, each){
                each.collapse(true);
            });
        };

        /////////////////////////////////////////////////////////////////////////////
        ////////////////////////////// O F F C A N V A S ////////////////////////////
        /////////////////////////////////////////////////////////////////////////////
        _this.showOffcanvas = function () {
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
        };
    }

    return Navigation;
});