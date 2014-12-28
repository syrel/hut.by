/**
 * Created by aliaksei on 28.12.2014.
 */

define([
    'jquery',
    'hutby/ui/VerticalTextualFlatList',
    'hutby/announcements/OnCategoryExpanded',
    'hutby/common/Strings'

],function($, VerticalTextualFlatList, OnCategoryExpanded, Strings){

    function CategoryAccordion(catalog, rooms) {
        var _this = $('<dd class="accordion-navigation"></dd>');
        var flats = catalog.flats(rooms);
        var flatList = new VerticalTextualFlatList(flats);
        var headerLink = $('<a class="side-nav-link category-link" href="#"></a>');

        _this.initialize = function () {
            _this.initializeHeaderLink();
            _this.initializeFlatList();

            catalog.announcer().onSendTo(OnCategoryExpanded, _this.onCategoryExpanded, _this);
        };

        _this.initializeHeaderLink = function () {
            headerLink.text(Strings.categoryName(rooms)).click(function(e){
                e.preventDefault();
                catalog.expandCategory(rooms, true);
            });
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
            if (ann.rooms() === rooms)
                _this.expand();
            else
                _this.collapse();
        };

        _this.initialize();

        return _this;
    }
    return CategoryAccordion;
});