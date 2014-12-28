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
    function VerticalTextualFlatList(flats){

        var _this = $('<ul class="content"></ul>');

        var flatLinks = new Dictionary();

        /**
         * Initialize method, executed during object construction
         */
        _this.initialize = function () {
            $.each(flats, function(index, each){
                each.announcer().onSendTo(OnFlatExpanded, _this.onFlatExpanded, _this);
                each.announcer().onSendTo(OnFlatCollapsed, _this.onFlatCollapsed, _this);
            });

            _this.build();
        };

        _this.build = function () {
            $.each(flats, function(index, flat) {
                _this.addLinkFor(flat).click(function(e){
                    e.preventDefault();
                    if (flat.isExpanded()) return;
                    _this.collapseFlats();
                    flat.expand(true);
                });
            });
        };

        /**
         * Build a html dom element for specified flat
         * @param _flat
         * @returns {*|HTMLElement}
         */
        _this.buildLinkFor = function (_flat) {
            return $('<li><a href="'+_flat.getLink()+'">'+_flat.getAddress()+'</a></li>');
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
            _this.append(link);
            return link;
        };

        /**
         * Collapse all flats
         */
        _this.collapseFlats = function(){
            $.each(flats,function(){this.collapse(true);})
        };

        /**
         * Makes a corresponding link for a flat look as active
         * @param flat
         */
        _this.setLinkActive = function(flat) {
            flatLinks.get(flat).find('a').addClass('active-flat');
        };

        /**
         * Makes a corresponding link for a flat look as inactive
         * @param flat
         */
        _this.setLinkInactive = function (flat) {
            flatLinks.get(flat).find('a').removeClass('active-flat');
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

        _this.expand = function () {
            _this.addClass('active');
        };

        _this.collapse = function () {
            _this.removeClass('active');
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
    return VerticalTextualFlatList;
});