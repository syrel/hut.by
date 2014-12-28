/**
 * Created by aliaksei on 05/08/14.
 */
define([
    'hutby/category/CategoryViewHolder',
    'hutby/category/FlatDescription',
    'hutby/ui/HorizontalFlatList',
    'hutby/lib/Dictionary',
    'hutby/lib/Utils',
    'hutby/common/Global',
    'hutby/announcements/OnFlatExpanded',
    'jquery',
    'jquery.animo',
    'hutby/common/Catalog'
],
    function (CategoryViewHolder, FlatDescription, HorizontalFlatList, Dictionary, Utils, Global, OnFlatExpanded, $) {

    function Category (catalog, prefix) {
        var _this = this;

        var holder = new CategoryViewHolder(prefix);

        var currentRooms;

        var flatList;
        var flatDescription;

        _this.createContainer = function () {
            if (Utils.isUndefined(holder.container())) {
                Global.pageContent.append($(_this.buildContainer()));
            }
        };

        /**
         * Removes flat list with animation or without, depending on passed isAnimated parameter.
         * @param isAnimated
         */
        _this.removeFlatList = function(isAnimated) {
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
            _this.removeFlatList(isAnimated);
            flatList = new HorizontalFlatList(catalog.flats(_this.getCurrentRooms()));
            _this.holder().container().prepend(flatList);

            flatList.open(isAnimated);
        };


        _this.buildContainer = function () {
            return '<div id="'+holder.containerID().slice(1)+'" class="hutby-category-container"></div>'
        };


        _this.holder = function () {
            return holder;
        };

        _this.show = function (rooms, animate, openFlat) {
            if (currentRooms === rooms) return;
            openFlat = Utils.isUndefined(openFlat) ? false : openFlat;

            currentRooms = rooms;
            _this.showFlatList(animate);

            if (openFlat) {
                catalog.announcer().announce(new OnFlatExpanded(catalog.flats(rooms)[0], animate, false));
            }
            else _this.removeFlat(animate);
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

        _this.getCurrentRooms = function () {
            return currentRooms;
        };

        _this.createContainer();
    }

    return Category;
});