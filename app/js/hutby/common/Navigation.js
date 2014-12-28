/**
 * Created by aliaksei on 03/08/14.
 */

define([
    'jquery',
    'hutby/main/Pager',
    'hutby/category/CategoryPreview',
    'hutby/category/Category',
    'hutby/common/Global',
    'hutby/announcements/OnFlatExpanded',
    'hutby/lib/Utils',
    'hutby/lib/Dictionary',
    'hutby/lib/WindowEvents'
], function($, Pager, CategoryPreview, Category, Global, OnFlatExpanded, Utils, Dictionary, WindowEvents){

    function Navigation(catalog) {
        var _this = this;

        var pager = new Pager(catalog, 'hutby-flat-pager-');
        var categoryPreview = new CategoryPreview(catalog, 'hutby-flat-category-preview-box-');
        var category = new Category(catalog, 'hutby-category-');

        var openFlatAutomatically = true;

        _this.initializeEvents = function() {
            _this.bindAnnouncements();
            _this.initializeOffcanvasEvents();

            _this.switchToMain();
            //_this.switchToCategory(1, openFlatAutomatically);
            //_this.switchToFlat(catalog.roomFlats(1)[4]);
        };

        _this.resetEvents = function () {
            Global.oneRoomFlatsLink.unbind('click').click(false);
            Global.twoRoomFlatsLink.unbind('click').click(false);
            Global.oneRoomFlatsLink.unbind('mouseenter mouseleave').click(false);
            Global.twoRoomFlatsLink.unbind('mouseenter mouseleave').click(false);
            Global.headerLink.unbind('click').click(false);
            Global.headerLink.unbind('mouseenter mouseleave').click(false);
        };

        /////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////// M A I N ////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////
        _this.switchToMain = function() {
            _this.initializeMainEvents();
            _this.makeAllLinksInactive();
            _this.showOffcanvas();
            _this.collapseAllAccordions();
            _this.makeOffcanvasFullWidth();
            _this.alignLinksCenter();
            _this.disableOffcanvasExit();
            pager.show();
        };

        _this.initializeMainEvents = function () {
            _this.resetEvents();

            _this.bindMainHeaderLink();

            _this.bindMainOneRoomFlatsLinkClick();
            _this.bindMainTwoRoomFlatsLinkClick();

            _this.bindMainOneRoomFlatsLinkHover();
            _this.bindMainTwoRoomFlatsLinkHover();
        };

        _this.bindMainHeaderLink = function () {
            Global.headerLink.click(function(e){
                e.preventDefault();
            });
        };

        _this.bindMainOneRoomFlatsLinkClick = function() {
            Global.oneRoomFlatsLink.click(function(e) {
                //_this.hideOffcanvas();
                var autoOpen = (Global.isDisplaySmall() && !Global.isDisplayMedium()) ? false : openFlatAutomatically;
                _this.switchToCategory(1, autoOpen);
                e.preventDefault();
            });
        };

        _this.bindMainTwoRoomFlatsLinkClick = function() {
            Global.twoRoomFlatsLink.click(function(e) {
                //_this.hideOffcanvas();
                var autoOpen = (Global.isDisplaySmall() && !Global.isDisplayMedium()) ? false : openFlatAutomatically;
                _this.switchToCategory(2, autoOpen);
                e.preventDefault();
            });
        };

        _this.bindMainOneRoomFlatsLinkHover = function() {
            Global.oneRoomFlatsLink.hover(
                function() {
                    categoryPreview.hoverAction(1, $(this));
                },
                function() {
                    categoryPreview.unhoverAction(1, $(this));
                }
            );
        };

        _this.bindMainTwoRoomFlatsLinkHover = function() {
            Global.twoRoomFlatsLink.hover(
                function() {
                    categoryPreview.hoverAction(2, $(this));
                },
                function() {
                    categoryPreview.unhoverAction(2, $(this));
                }
            );
        };


        /////////////////////////////////////////////////////////////////////////////
        /////////////////////////////// C A T E G O R Y /////////////////////////////
        /////////////////////////////////////////////////////////////////////////////
        _this.switchToCategory = function(_rooms, openFlat) {
            openFlat = Utils.isUndefined(openFlat) ? false : openFlat;

            if (Global.isDisplayMedium()) _this.alignLinksLeft();
            _this.disableOffcanvasExit();

            _this.switchCategoryLink(_rooms);
            _this.resetEvents();
            categoryPreview.hide(0.1,0, true);
            category.show(_rooms, false, openFlat);
            pager.hide(_this.initializeCategoryEvents);
        };

        _this.initializeCategoryEvents = function(){

            _this.bindCategoryHeaderLink();

            _this.bindCategoryOneRoomFlatsLinkClick();
            _this.bindCategoryTwoRoomFlatsLinkClick();

            _this.bindCategoryOneRoomFlatsLinkHover();
            _this.bindCategoryTwoRoomFlatsLinkHover();

        };

        _this.bindCategoryHeaderLink = function () {
            Global.headerLink.click(function(e){
                _this.switchToMain();
                e.preventDefault();
            });
        };

        _this.bindCategoryOneRoomFlatsLinkClick = function () {
            Global.oneRoomFlatsLink.click(function(e) {
                //_this.hideOffcanvas();
                _this.switchCategoryLink(1);
                var autoOpen = (Global.isDisplaySmall() && !Global.isDisplayMedium()) ? false : openFlatAutomatically;
                category.show(1, true, autoOpen);
                e.preventDefault();
            });
        };

        _this.bindCategoryTwoRoomFlatsLinkClick = function () {
            Global.twoRoomFlatsLink.click(function(e) {
                //_this.hideOffcanvas();
                _this.switchCategoryLink(2);
                var autoOpen = (Global.isDisplaySmall() && !Global.isDisplayMedium()) ? false : openFlatAutomatically;
                category.show(2, true, autoOpen);
                e.preventDefault();
            });
        };

        _this.bindCategoryOneRoomFlatsLinkHover = function (){
            // nothing to do here
        };

        _this.bindCategoryTwoRoomFlatsLinkHover = function (){
            // nothing to do here
        };
        /////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////// F L A T  ///////////////////////////////
        /////////////////////////////////////////////////////////////////////////////

        _this.switchToFlat = function(flat, animation, switchCategory) {
            _this.makeOffcanvasDefaultWidth();
            _this.enableOffcanvasExit();
            _this.alignLinksLeft();

            animation = Utils.isUndefined(animation) ? false : animation;
            switchCategory = Utils.isUndefined(switchCategory) ? true : switchCategory;

            if (switchCategory) _this.switchToCategory(flat.getRooms(), false);
            _this.makeAllAccordionFlatInactive();
            _this.makeAccordionFLatActive(flat);
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

        _this.makeAllLinksInactive = function () {
            Global.oneRoomFlatsLink.closest('div.hutby-sidenav-footer-position-wrapper').find('a.active').removeClass('active');
        };

        _this.makeLinkActive = function (link) {
            link.addClass('active');
        };

        _this.makeCategoryLinkActive = function (rooms) {
            _this.makeLinkActive(_this.getCategoryLink(rooms));
        };

        _this.switchCategoryLink = function (rooms) {
            _this.makeAllLinksInactive();
            _this.makeCategoryLinkActive(rooms);
            _this.collapseAllAccordions();
            _this.expandAccordion(rooms);
            _this.makeAllAccordionFlatInactive();
        };

        _this.getCategoryLink = function (rooms) {
            return Global.oneRoomFlatsLink.closest('div.hutby-sidenav-footer-position-wrapper').find('a.category-link').eq(rooms-1);
        };

        _this.expandAccordion = function (rooms) {
            _this.createFlatLinks(rooms);
            $('#'+Global.getData(_this.getCategoryLink(rooms)).id).addClass('active');
        };

        _this.collapseAllAccordions = function () {
            Global.oneRoomFlatsLink.closest('dl.accordion').find('.content').removeClass('active');
        };

        _this.makeAccordionFLatActive = function (flat) {
            var link = _this.getCategoryLink(flat.getRooms());
            console.log($('#'+Global.getData(link).id).find('a'));
            $($('#'+Global.getData(link).id).find('a')[Dictionary._indexInArray(catalog.flats(flat.getRooms()),flat)]).addClass('active-flat');
            Global.oneRoomFlatsLink.closest('dl.accordion').find('a.active-flat').each(function() {
                _this.redrawDom(this);
            });
        };

        _this.makeAllAccordionFlatInactive = function () {
            Global.oneRoomFlatsLink.closest('dl.accordion').find('a.active-flat').removeClass('active-flat');
        };

        _this.createFlatLinks = function(rooms) {
            if ($('#'+Global.getData(_this.getCategoryLink(rooms)).id).length > 0) return;
            _this.getCategoryLink(rooms).after(_this.buildFlatLinks(rooms));
        };

        _this.buildFlatLinks = function(rooms) {
            var flats = catalog.flats(rooms);
            var html = $('<ul id="'+Global.getData(_this.getCategoryLink(rooms)).id+'" class="content"></ul>');
            $.each(flats, function(index, flat){
                html.append($('<li><a href="'+flat.getLink()+'">'+flat.getAddress()+'</a></li>').click(function(e){
                    _this.hideOffcanvas();
                    catalog.announcer().announce(new OnFlatExpanded(flat, true));
                    e.preventDefault();
                }));
            });
            return html;
        };

        _this.alignLinksCenter = function() {
            $('.side-nav-link').each(function(){
                this.style.textAlign = 'center';
                _this.redrawDom(this);
            });
        };

        _this.alignLinksLeft = function() {
            $('.side-nav-link').each(function(){
                this.style.textAlign = "left";
                _this.redrawDom(this);
            });
        };

        _this.redrawDom = function(element) {
            element.style.display='run-in';
            element.offsetHeight;
            element.style.display='block';
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