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

    /**
     * @param catalog - catalog holding all flats
     * @param rooms - flats with how much rooms will be shown in this accordion
     * @returns {*|HTMLElement}
     * @constructor
     */
    function CategoryAccordion(catalog, rooms) {
        var _this = $('<dd class="accordion-navigation"></dd>');
        var flats = catalog.flats(rooms);
        var flatList = new VerticalTextualFlatList(flats);
        var headerLink = $('<a class="side-nav-link category-link" href="/index.html"></a>');

        /**
         * Constructor
         */
        _this.initialize = function () {
            _this.initializeHeaderLink();
            _this.initializeFlatList();

            catalog.announcer().onSendTo(OnCategoryExpanded, _this.onCategoryExpanded, _this);
            catalog.announcer().onSendTo(OnCategoryCollapsed, _this.onCategoryCollapsed, _this);
        };

        /**
         * Configures header link
         */
        _this.initializeHeaderLink = function () {
            _this.alignLinkCenter();
            headerLink.text(Strings.categoryName(rooms));
            _this.initializeHeaderLinkEvents();
            _this.append(headerLink);
        };

        /**
         * Sets event listeners for click and hover/unhover actions
         */
        _this.initializeHeaderLinkEvents = function () {
            headerLink.click(function(e){
                e.preventDefault();
                catalog.expandCategory(rooms, catalog.isCategoryExpanded());
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
        };

        /**
         * Adds flats list to the dom
         */
        _this.initializeFlatList = function () {
            _this.append(flatList);
        };

        /**
         * Styles header link to look like active
         */
        _this.makeLinkActive = function () {
            headerLink.addClass('active');
        };

        /**
         * Style header link to look like inactive
         */
        _this.makeLinkInactive = function () {
            headerLink.removeClass('active');
        };

        /**
         * Expands accordion and makes header link active
         */
        _this.expand = function () {
            _this.makeLinkActive();
            flatList.expand();
        };

        /**
         * Collapses accordion and makes header link inactive
         */
        _this.collapse = function () {
            _this.makeLinkInactive();
            flatList.collapse();
        };

		/**
         * I'm called when a category is expanded. As a result
		 * header link will aligned to the left and accordion
		 * will be expanded if I'm that expanded category, otherwise
		 * collapsed
         */
        _this.onCategoryExpanded = function(ann) {
            _this.alignLinkLeft();
            if (ann.rooms() === rooms)
                _this.expand();
            else
                _this.collapse();
        };

		/**
         * I'm called when a category is collapse. As a result
		 * header link will aligned to the center and accordion
		 * will be collapsed
         */
        _this.onCategoryCollapsed = function(){
            _this.alignLinkCenter();
            _this.collapse();
        };

		/**
         * Aligns category header's link text to the center
         */
        _this.alignLinkCenter = function() {
           headerLink.css('text-align','center');
        };
		
		/**
         * Aligns category header's link text to the left
         */
        _this.alignLinkLeft = function() {
            headerLink.css('text-align','left');
        };

        _this.initialize();

        return _this;
    }
    return CategoryAccordion;
});