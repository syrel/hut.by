/**
 * Created by aliaksei on 05/08/14.
 */
define(['hutby/category/CategoryViewHolder', 'hutby/category/FlatDescription', 'hutby/lib/Dictionary','hutby/lib/Utils','hutby/common/Global', 'hutby/announcements/OnExpandFlat', 'jquery', 'jquery.animo','hutby/common/Catalog'],
    function (CategoryViewHolder, FlatDescription, Dictionary, Utils, Global, OnExpandFlat, $) {

    function Category (catalog, prefix) {
        var _this = this;

        var listShowEffect = 'moveInLeft';
        var listShowSpeed = 0.4;
        var flatLinkMaxWidth = 19;
        var activeLinkID = '.active';

        var holder = new CategoryViewHolder(prefix);

        var flatLinkDictionary;

        var currentRooms;

        var flatDescription;

        _this.createContainer = function () {
            if (Utils.isUndefined(holder.container())) {
                Global.pageContent.append($(_this.buildContainer()));
            }
        };

        _this.createFlatList = function () {
            if (Utils.isUndefined(holder.flatList())) {
                if (Utils.isUndefined(holder.container())) _this.createContainer();
                holder.container().append($(_this.buildFlatList()));
            }
        };

        _this.createFlatLinks = function (rooms, animate ,_callback) {
            if (Utils.isUndefined(holder.flatList())) _this.createFlatList();
            if (holder.flatList().length === 0) return;

            holder.flatList().css('visibility','hidden');
            holder.flatList().empty();

            _this.setLastLinkInactive();
            flatLinkDictionary = new Dictionary();

            var flatLinkWidth = Math.min(Math.floor(100/catalog.flats(rooms).length),flatLinkMaxWidth);
            $.each(catalog.flats(rooms), function(index, flat) {
                var link = $(_this.buildFlatLink(flat));

                flatLinkDictionary.put(flat,link);

                link.css('width',flatLinkWidth+'%').click(function(e){
                    e.preventDefault();
                    catalog.announcer().announce(new OnExpandFlat(flat, true));
                });

                holder.flatList().append(link);
            });

            /*
             Only after all images are loaded
             */
            Utils.attachOnLoadListener(holder.flatList().find('img'), function() {
                holder.flatList().css('visibility','visible');

                if (animate) {
                    holder.flatList().animo({ animation: listShowEffect, duration: listShowSpeed }, function() {
                        Utils.call(_callback);
                    });
                }

                else Utils.call(_callback);
            }, function(element){
                element.animo({ animation: 'fadeIn', duration: 0.5 });
            });
        };

        _this.buildContainer = function () {
            return '<div id="'+holder.containerID().slice(1)+'" class="hutby-category-container"></div>'
        };

        _this.buildFlatList = function () {
            return '<div class="hutby-category-flat-list"><div id="'+holder.flatListID().slice(1)+'"></div></div>';
        };

        _this.buildFlatLink = function (_flat) {
            return '<a href="'+_flat.getLink()+'"><img src="'+_flat.getPhoto(0)+'"><p>'+_flat.getAddress()+'</p></a>';
        };

        _this.holder = function () {
            return holder;
        };

        _this.show = function (rooms, animate, openFlat) {
            if (currentRooms === rooms) return;
            openFlat = Utils.isUndefined(openFlat) ? false : openFlat;

            _this.createFlatLinks(rooms, animate);
            currentRooms = rooms;

            if (openFlat) catalog.announcer().announce(new OnExpandFlat(catalog.flats(rooms)[0], animate, false));
            else _this.removeFlat(animate);
        };

        _this.removeFlat = function (animate, _callback) {
            _this.setLastLinkInactive();
            if (!Utils.isUndefined(flatDescription)) {
                flatDescription.destroy(animate, _callback);
            }
            else Utils.call(_callback);
        };

        _this.setLastLinkInactive = function(){
            if (!Utils.isUndefined(holder.flatList())){
                holder.flatList().find(activeLinkID).removeClass(activeLinkID.slice(1));
            }
        };

        _this.setLinkActive = function(flat) {
            flatLinkDictionary.get(flat).addClass(activeLinkID.slice(1));
        };

        _this.expandFlat = function (flat, animate, _callback) {

            _this.removeFlat(animate, function(){
                flatDescription = new FlatDescription(_this, flat, prefix+'description-');
                flatDescription.show(animate, _callback);
                _this.setLastLinkInactive();
                _this.setLinkActive(flat);
            });
        };

        _this.scrollToDescription = function () {
            holder.container().animate({scrollTop: $(flatDescription.holder().containerID()).offset().top},500);
        };

        _this.getCurrentRooms = function () {
            return currentRooms;
        };
    };

    return Category;
});