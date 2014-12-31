/**
 * Created by aliaksei on 28.12.2014.
 */

"use strict";
define([
    'jquery',
    'hutby/ui/VerticalTextualFlatList',
    'hutby/announcements/OnCategoryExpanded',
    'hutby/announcements/OnCategoryCollapsed',
    'hutby/category/CategoryPreview',
    'hutby/common/Strings'

],function($, VerticalTextualFlatList, OnCategoryExpanded, OnCategoryCollapsed, CategoryPreview, Strings){

    function CategoryAccordion(catalog, rooms) {
        var _this = $('<dd class="accordion-navigation"></dd>');
        var flats = catalog.flats(rooms);
        var flatList = new VerticalTextualFlatList(flats);
        var headerLink = $('<a class="side-nav-link category-link" href="/index.html"></a>');

        _this.initialize = function () {
            _this.initializeHeaderLink();
            _this.initializeFlatList();

            catalog.announcer().onSendTo(OnCategoryExpanded, _this.onCategoryExpanded, _this);
            catalog.announcer().onSendTo(OnCategoryCollapsed, _this.onCategoryCollapsed, _this);
        };

        /**
         * Configurates header link and sets event callbacks for click and hover/unhover actions
         */
        _this.initializeHeaderLink = function () {
            _this.alignLinkCenter();
            headerLink.text(Strings.categoryName(rooms));
            headerLink.click(function(e){
                e.preventDefault();
                //catalog.expandCategory(rooms, true);
                catalog.flats(rooms)[0].expand(catalog.isCategoryExpanded(), !catalog.isCategoryExpanded());
                return false;
            });
            headerLink.hover(
                function() {
                    catalog.showCategoryPreview(rooms, $(this));
                },
                function() {
                    catalog.hideCategoryPreview(rooms, $(this));
                }
            );

            _this.append(headerLink);
        };

        _this.initializeFlatList = function () {
            _this.append(flatList);
        };

        _this.makeLinkActive = function () {
            headerLink.addClass('active');
        };

        _this.makeLinkInactive = function () {
            headerLink.removeClass('active');
        };

        _this.expand = function () {
            _this.makeLinkActive();
            flatList.expand();
        };

        _this.collapse = function () {
            _this.makeLinkInactive();
            flatList.collapse();
        };

        _this.onCategoryExpanded = function(ann) {
            _this.alignLinkLeft();
            if (ann.rooms() === rooms)
                _this.expand();
            else
                _this.collapse();
        };

        _this.onCategoryCollapsed = function(){
            _this.alignLinkCenter();
            _this.collapse();
        };

        _this.alignLinkCenter = function() {
           headerLink.css('text-align','center');
        };

        _this.alignLinkLeft = function() {
            headerLink.css('text-align','left');
        };

        _this.initialize();

        return _this;
    }
    return CategoryAccordion;
});