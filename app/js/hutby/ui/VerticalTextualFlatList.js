/**
 * Created by aliaksei on 17/11/14.
 */

define([
    'ul',
    'li',
    'a',
    'hutby/announcements/OnFlatExpanded',
    'hutby/announcements/OnFlatCollapsed',
    'hutby/lib/Utils',
    'hutby/lib/Dictionary'
],function(
    Ul,
    Li,
    A,
    OnFlatExpanded,
    OnFlatCollapsed,
    Utils,
    Dictionary
    ){

    /**
     * I'm a presentation of a flat links positioned horizontally.
     * @param flats - array of Flat models to be displayed
     * @constructor
     */
    function VerticalTextualFlatList(flats) {

        var _this = new Ul().class('content');

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

        /**
         * Creates and adds to the dom links for each flat
         */
        _this.build = function () {
            $.each(flats, function(index, flat) {
                _this.addLinkFor(flat).click(function(e){
                    e.preventDefault();
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
            return new Li().add(new A().href(_flat.getLink()).text(_flat.getAddress()));
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
         * Makes a corresponding link for a flat look as active
         * @param flat
         */
        _this.setLinkActive = function(flat) {
            flatLinks.get(flat).findMe('a').active(true);
        };

        /**
         * Makes a corresponding link for a flat look as inactive
         * @param flat
         */
        _this.setLinkInactive = function (flat) {
            flatLinks.get(flat).findMe('a').active(false);
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
            _this.active(true);
        };

        _this.collapse = function () {
            _this.active(false);
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