/**
 * Created by aliaksei on 17/11/14.
 */

define([
    'jquery',
    'hutby/announcements/OnFlatExpanded',
    'hutby/lib/Utils',
    'hutby/lib/Dictionary'
    ],function($, OnFlatExpanded, Utils, Dictionary){
    /**
     *
     * @param catalog - main model
     * @param flats - array of Flat objects to be displayed
     * @constructor
     */
    function HorizontalFlatList(flats){
        var flatLinkMaxWidth = 19;
        var listID = 'hutby-category-flat-list';
        var activeLinkID = '.active';
        var listShowEffect = 'moveInLeft';
        var listShowSpeed = 0.4;

        var _this = $('<div class="'+listID+'"></div>');
        var flatList = $('<div id="'+listID+'"></div>');

        var flatLinkDictionary = new Dictionary();

        /**
         * Initialize method, executed during object construction
         */
        _this.initialize = function () {
            _this.append(flatList);
            _this.cssHidden();

            $.each(flats, function(index, each){
                each.announcer().onSendTo(OnFlatExpanded, _this.onFlatExpanded, _this);
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
         * Build and adds to dom a link for specified flat model
         * @param _flat
         * @returns {*|HTMLElement}
         */
        _this.addLinkFor = function (_flat) {
            var link = $(_this.buildLinkFor(_flat));
            flatLinkDictionary.put(_flat,link);
            flatList.append(link);
            return link;
        };

        _this.calculateLinkWidth = function () {
            return Math.min(Math.floor(100/flats.length),flatLinkMaxWidth);
        };

        _this.cssHidden = function () {
            _this.css('visibility','hidden');
        };

        _this.setLastLinkInactive = function(){
            flatList.find(activeLinkID).removeClass(activeLinkID.slice(1));
        };

        _this.setLinkActive = function(flat) {
            flatLinkDictionary.get(flat).addClass(activeLinkID.slice(1));
        };

        _this.onFlatExpanded = function(ann) {
            _this.setLastLinkInactive();
            _this.setLinkActive(ann.flat());
        };

        _this.open = function (animate ,_callback) {
            var flatLinkWidth = _this.calculateLinkWidth();

            $.each(flats, function(index, flat) {
                _this.addLinkFor(flat).css('width',flatLinkWidth+'%').click(function(e){
                    e.preventDefault();
                    flat.expand(true);
                });
            });

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

        _this.initialize();

        return _this;
    }
    return HorizontalFlatList;
})