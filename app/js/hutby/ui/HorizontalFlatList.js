/**
 * Created by aliaksei on 17/11/14.
 */

define([
    'jquery',
    'hutby/announcements/OnFlatExpanded',
    'hutby/announcements/OnFlatCollapsed',
    'hutby/lib/Utils',
    'hutby/lib/Dictionary'
    ],function($, OnFlatExpanded, OnFlatCollapsed, Utils, Dictionary){

    /**
     * I'm a presentation of a flat links positioned horizontally.
     * @param flats - array of Flat models to be displayed
     * @constructor
     */
    function HorizontalFlatList(flats){
        var flatLinkMaxWidth = 19;
        var listID = 'hutby-category-flat-list';
        var activeLinkID = '.active';
        var listShowEffect = 'moveInLeft';
        var listShowSpeed = 0.4;

        var _this = $('<div class="'+listID+'"></div>');
        var flatList = $('<div></div>');

        var flatLinks = new Dictionary();

        /**
         * Initialize method, executed during object construction
         */
        _this.initialize = function () {
            _this.append(flatList);
            _this.cssHidden();

            $.each(flats, function(index, each){
                each.announcer().onSendTo(OnFlatExpanded, _this.onFlatExpanded, _this);
                each.announcer().onSendTo(OnFlatCollapsed, _this.onFlatCollapsed, _this);
            });
        };

        /**
         * Build a html dom element for specified flat
         * @param _flat
         * @returns {*|HTMLElement}
         */
        _this.buildLinkFor = function (_flat) {
            return $('<a href="'+_flat.getLink()+'"><img src="'+_flat.getPhoto(0)+'"><p>'+_flat.getAddress()+'</p></a>');
        };

        /**
         * Builds a link and adds it to dom for specified flat model
         * @param _flat
         * @returns {*|HTMLElement}
         */
        _this.addLinkFor = function (_flat) {
            var link = $(_this.buildLinkFor(_flat));
            flatLinks.put(_flat,link);
            if (_flat.isExpanded()) _this.setLinkActive(_flat);
            flatList.append(link);
            return link;
        };

        /**
         * Calculates the width of a link. It depends on the number of flats
         * @returns {number}
         */
        _this.calculateLinkWidth = function () {
            return Math.min(Math.floor(100/flats.length),flatLinkMaxWidth);
        };

        /**
         * Hides me using css option
         */
        _this.cssHidden = function () {
            _this.css('visibility','hidden');
        };

        /**
         * Makes a corresponding link for a flat look as active
         * @param flat
         */
        _this.setLinkActive = function(flat) {
            flatLinks.get(flat).addClass(activeLinkID.slice(1));
        };


        /**
         * Makes a corresponding link for a flat look as inactive
         * @param flat
         */
        _this.setLinkInactive = function (flat) {
            flatLinks.get(flat).removeClass(activeLinkID.slice(1));
        };

        /**
         * Event handler on flat expanded action
         * @param ann
         */
        _this.onFlatExpanded = function(ann) {
            _this.setLinkActive(ann.flat());
        };

        _this.onFlatCollapsed = function(ann) {
            _this.setLinkInactive(ann.flat());
        };

        _this.open = function (animate ,_callback) {
            var flatLinkWidth = _this.calculateLinkWidth();

            $.each(flats, function(index, flat) {
                _this.addLinkFor(flat).css('width',flatLinkWidth+'%').click(function(e){
                    e.preventDefault();
                    flat.expand(true);
                });
            });

            _this.setOnLoadListener(animate ,_callback);
        };


        /**
         * Sets a callback that will be fired when all images are loaded.
         * @param animate
         * @param _callback
         */
        _this.setOnLoadListener = function (animate ,_callback) {
            /*
             Only after all images are loaded
             */
            Utils.attachOnLoadListener(flatList.find('img'), function() {
                flatList.css('visibility','visible');

                if (animate) {
                    flatList.animo({ animation: listShowEffect, duration: listShowSpeed }, function() {
                        Utils.call(_callback);
                    });
                }

                else Utils.call(_callback);
            }, function(element){
                element.animo({ animation: 'fadeIn', duration: 0.5 });
            });
        };

        /**
         * Must be called as soon as I'm not used any more
         */
        _this.destroy = function () {
            $.each(flats, function(index, each){
                each.announcer().unsubscribe(_this);
            });
        };

        _this.initialize();

        return _this;
    }
    return HorizontalFlatList;
});