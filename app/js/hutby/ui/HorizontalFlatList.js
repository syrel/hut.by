/**
 * Created by aliaksei on 17/11/14.
 */

"use strict";
define([
    'jquery',
    'a',
    'div',
    'img',
    'p',
    'hutby/announcements/OnFlatExpanded',
    'hutby/announcements/OnFlatCollapsed',
    'utils',
    'dictionary'
    ],function(
    $,
    A,
    Div,
    Img,
    P,
    OnFlatExpanded,
    OnFlatCollapsed,
    Utils,
    Dictionary){

    /**
     * I'm a presentation of a flat links positioned horizontally.
     * @param flats - array of Flat models to be displayed
     * @constructor
     */
    function HorizontalFlatList(flats){
        var _this = new Div().class('hutby-category-flat-list');
        var flatList = new Div();

        var flatLinkMaxWidth = 19;

        var flatLinks = new Dictionary();

        /**
         * Initializing method, executed during object construction
         */
        _this.initialize = function () {
            _this.append(flatList);
            _this.hidden(true);

            $.each(flats, function(index, each){
                each.announcer().onSendTo(OnFlatExpanded, _this.onFlatExpanded, _this);
                each.announcer().onSendTo(OnFlatCollapsed, _this.onFlatCollapsed, _this);
            });
        };

        /**
         * Build a html dom element for specified flat
         * @param flat
         * @returns {*|HTMLElement}
         */
        _this.buildLinkFor = function (flat) {
            return new A()
                .href(flat.getLink)
                .add(new Img().src(flat.titlePhoto().thumbnail().path()))
                .add(new P().text(flat.address()));
        };

        /**
         * Builds a link and adds it to dom for specified flat model
         * @param _flat
         * @returns {*|HTMLElement}
         */
        _this.addLinkFor = function (_flat) {
            var link = _this.buildLinkFor(_flat);
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
         * Makes a corresponding link for a flat look as active
         * @param flat
         */
        _this.setLinkActive = function(flat) {
            flatLinks.get(flat).active(true);
        };

        /**
         * Makes a corresponding link for a flat look as inactive
         * @param flat
         */
        _this.setLinkInactive = function (flat) {
            flatLinks.get(flat).active(false);
        };

        /**
         * Event handler on flat expanded action
         * @param ann
         */
        _this.onFlatExpanded = function(ann) {
            _this.setLinkActive(ann.flat());
        };

        /**
         * Event handler on flat collapsed action
         * @param ann
         */
        _this.onFlatCollapsed = function(ann) {
            _this.setLinkInactive(ann.flat());
        };

        /**
         * Adds photo links for each flat to the dom and
         * sets corresponding on click events
         * @param animate
         * @param _callback
         */
        _this.open = function (animate ,_callback) {
            var flatLinkWidth = _this.calculateLinkWidth();

            $.each(flats, function(index, flat) {
                _this.addLinkFor(flat).width(flatLinkWidth+'%').click(function(e) {
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
            Utils.attachOnLoadListener(flatList.findMe('img'), function() {
                flatList.visible(true);

                if (animate) {
                    flatList.animo({ animation: 'moveInLeft', duration: 0.4 }, function() {
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