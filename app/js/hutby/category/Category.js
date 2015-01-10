/**
 * Created by aliaksei on 05/08/14.
 */

"use strict";
define([
    'hutby/category/CategoryViewHolder',
    'hutby/category/FlatDescription',
    'hutby/ui/HorizontalFlatList',
    'dictionary',
    'hutby/lib/Utils',
    'hutby/common/Global',
    'hutby/announcements/OnFlatExpanded',
    'hutby/announcements/OnCategoryExpanded',
    'jquery',
    'jquery.animo'
], function (
    CategoryViewHolder,
    FlatDescription,
    HorizontalFlatList,
    Dictionary,
    Utils,
    Global,
    OnFlatExpanded,
    OnCategoryExpanded,
    $) {

    function Category (catalog, prefix) {
        var _this = this;

        var holder = new CategoryViewHolder(prefix);

        var flatList;
        var flatDescription;

        _this.initialize = function() {
            catalog.announcer().onSendTo(OnFlatExpanded, _this.onFlatExpanded, _this);
            catalog.announcer().onSendTo(OnCategoryExpanded, _this.onCategoryExpanded, _this);
        };

        _this.onFlatExpanded = function (ann) {
            _this.expandFlat(ann.flat(), ann.animation());
        };

        _this.onCategoryExpanded = function(ann) {
            _this.showFlatList(ann.animation());
        };

        _this.createContainer = function () {
            if (Utils.isUndefined(holder.container())) {
                Global.pageContent.append($(_this.buildContainer()));
            }
        };

        /**
         * Removes flat list with animation or without, depending on passed isAnimated parameter.
         */
        _this.removeFlatList = function() {
            if (!Utils.isUndefined(flatList)) {
                flatList.destroy();
                flatList.remove();
                flatList = null;
            }
        };

        /**
         * Adds flat list with animation or without. If list already exists removes it
         * using removeFlatList method.
         * @param isAnimated
         */
        _this.showFlatList = function (isAnimated) {
            _this.removeFlatList();
            flatList = new HorizontalFlatList(catalog.flats(catalog.expandedCategory()));
            _this.holder().container().prepend(flatList);

            flatList.open(isAnimated);
        };

        _this.buildContainer = function () {
            return '<div id="'+holder.containerID().slice(1)+'" class="hutby-category-container"></div>'
        };

        _this.holder = function () {
            return holder;
        };

        _this.removeFlat = function (animate, _callback) {
            if (!Utils.isUndefined(flatDescription)) {
                flatDescription.destroy(animate, _callback);
            }
            else Utils.call(_callback);
        };

        _this.expandFlat = function (flat, animate, _callback) {

            _this.removeFlat(animate, function(){
                flatDescription = new FlatDescription(_this, flat, prefix+'description-');
                flatDescription.show(animate, _callback);
            });
        };

        _this.scrollToDescription = function () {
            holder.container().animate({scrollTop: $(flatDescription.holder().containerID()).offset().top},500);
        };

        _this.initialize();
        _this.createContainer();
    }

    return Category;
});