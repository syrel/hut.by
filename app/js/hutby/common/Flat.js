/**
 * Created by aliaksei on 03/08/14.
 */
define([
    'dictionary',
    'announcer',
    'hutby/announcements/OnFlatExpanded',
    'hutby/announcements/OnFlatCollapsed',
    'hutby/common/Photo',
    'hutby/common/ValueHolder'
], function(
    Dictionary,
    Announcer,
    OnFlatExpanded,
    OnFlatCollapsed,
    Photo,
    ValueHolder) {


    /**
     *
     * @param [_config]
     * @constructor
     * @class Price
     */
    function Price(_config) {
        var _this = this;

        var amount = new ValueHolder();
        var currency = new ValueHolder('$');
        var special = new ValueHolder();

        /**
         * @param {Object} config
         * @param {int|String} config.amount
         * @param {String} config.currency
         * @param {String} config.special
         */
        _this.initialize = function(config) {
            if (_.isUndefined(config)) return;
            amount.value(config.amount);
            currency.value(config.currency);
            special.value(config.special);
        };

        _this.amount = function () {
            return amount.value();
        };

        _this.amountHolder = function() {
            return amount;
        };

        _this.currency = function () {
            return currency.value();
        };

        _this.currencyHolder = function(){
            return currency;
        };

        _this.special = function () {
            return special.value();
        };

        _this.specialHolder = function() {
            return special;
        };

        _this.accept = function(visitor) {
            visitor.visitPrice(_this);
        };

        _this.toJSON = function(){
            return {
                amount: amount,
                currency: currency,
                special: special
            }
        };

        /**
         * Prints price in human readable format
         * @returns {String}
         */
        _this.printString = function () {
            return _this.amount() + _this.currency();
        };

        _this.initialize(_config);
    }

    /**
     * @param [_config]
     * @constructor
     * @class Overview
     */
    function Overview(_config) {
        var _this = this;

        var description = "";
        var features  = [];
        var specs = [];

        /**
         * @param {Object} config
         * @param {String} config.description
         * @param {Array} config.features
         * @param {Array} config.specs
         */
        _this.initialize = function (config) {
            if (_.isUndefined(config)) return;
            description = config.description;
            features = _.map(config.features, function(each) {return new ValueHolder(each)});
            specs = _.map(config.specs, function(each) {return new ValueHolder(each)});
        };

        /**
         * @returns {string}
         */
        _this.description = function () {
            return description;
        };

        /**
         * @returns {Array}
         */
        _this.features = function () {
            return _.map(features, function(each){ return each.value()});
        };

        _this.featureHolders = function() {
            return features;
        };

        /**
         * @returns {Array}
         */
        _this.specs = function() {
            return _.map(specs, function(each){ return each.value()});
        };

        _this.specHolders = function() {
            return specs;
        };

        _this.accept = function(visitor) {
            visitor.visitOverview(_this);
        };

        _this.toJSON = function () {
            return {
                features: features,
                specs: specs
            }
        };

        _this.newFeature = function() {
            var feature = new ValueHolder('новая особенность');
            features.push(feature);
            return feature;
        };

        _this.newSpec = function() {
            var spec = new ValueHolder('новая опция');
            specs.push(spec);
            return spec;
        };

        _this.initialize(_config);
    }

    /**
     *
     * @param [_config]
     * @constructor
     * @class Flat
     */
    function Flat(_config) {
        var _this = this;

        var rooms = 1;
        var address = new ValueHolder();
        var price = new Price();
        var overview = new Overview();
        var photos = [];

        var catalog;
        var isExpanded = false;
        var announcer = new Announcer();
        /**
         *
         * @param {Object} config
         * @param {int} config.rooms
         * @param {String} config.title
         * @param {Array} config.photos
         * @param {String} config.address
         * @param {Object} config.price
         * @param {Object} config.overview
         */
        _this.initialize = function (config) {
            if (_.isUndefined(config)) return;
            rooms = config.rooms;
            address.value(config.address);
            price = new Price(config.price);
            overview = new Overview(config.overview);
            _.each(config.photos, _this.addPhoto);
        };

        /**
         * @returns {Array}
         */
        _this.photos = function () {
            return photos;
        };

        /**
         * Adds new photo to existing ones
         * @param {Object} photo
         */
        _this.addPhoto = function (photo) {
            photos.push(new Photo(photo));
        };

        /**
         * Returns photo at index
         * @param _index
         * @returns {Photo}
         */
        _this.photoAt = function(_index) {
            if (_index >= photos.length) return null;
            return photos[_index];
        };

        /**
         * Photo that should be used as title
         * @returns {Photo}
         */
        _this.titlePhoto = function () {
            return _this.photoAt(0);
        };

        /**
         * Setter/getter for price value
         * @returns {Price}
         */
        _this.price = function() {
            return price;
        };

        /**
         * Setter/getter for address
         * @param {String} [aString]
         * @returns {Flat|String}
         */
        _this.address = function (aString) {
            if (_.isUndefined(aString)) return address.value();
            address.value(aString);
            return _this;
        };

         _this.addressHolder = function() {
            return address;
        };

        _this.getLink = function() {
            return '#';
        };

        _this.capitalizeFirstLetter = function (string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        };

        _this.printTitle = function () {
            return _this.capitalizeFirstLetter(_this.roomsString()) + ' по ' + _this.address();
        };

        _this.setRooms = function (_rooms) {
            rooms = _rooms;
        };

        _this.getRooms = function () {
            return rooms;
        };

        _this.roomsString = function () {
            switch (_this.getRooms()) {
                case 1 : return 'однокомнатная';
                case 2 : return 'двухкомнатная';
                case 3 : return 'трехкомнатная';
                default : return 'многокомнатная';
            }
        };

        _this.getPhotosCount = function () {
            return photos.length;
        };

        /**
         * @returns {Overview}
         */
        _this.overview = function () {
            return overview;
        };

        _this.announcer = function () {
            return announcer;
        };

        _this.isExpanded = function () {
            return isExpanded;
        };

        _this.setCatalog = function (_catalog) {
            catalog = _catalog;
        };

        _this.catalog = function () {
            return catalog;
        };

        /**
         * Collapses flat if and only if it is expanded. Notifies catalog
         * about collapsed flat.
         * @param isAnimated - true to use animation for collapsing
         */
        _this.collapse = function (isAnimated) {
            if (!_this.isExpanded()) return;
            isExpanded = false;
            var ann = new OnFlatCollapsed(_this, isAnimated);
            _this.catalog().onFlatCollapsed(ann);
            _this.announcer().announce(ann);
        };

        _this.expand = function (isAnimated, force) {
            var wasExpanded = _this.isExpanded();
            force = _.isUndefined(force) ? false : force;
            if (_this.isExpanded() && !force) return;
            isExpanded = true;
            var ann = new OnFlatExpanded(_this, isAnimated, true);
            _this.catalog().onFlatExpanded(ann);
            if (!wasExpanded)_this.announcer().announce(ann);
        };

        _this.accept = function (visitor) {
            visitor.visitFlat(_this);
            price.accept(visitor);
            overview.accept(visitor);
            _.each(photos, function(photo) { photo.accept(visitor)});
        };

        _this.toJSON = function(){
            return {
                rooms: rooms,
                address: address,
                price: price.toJSON(),
                overview: overview.toJSON(),
                photos: _.map(photos, function(photo){ return photo.toJSON()})
            }
        };

        _this.initialize(_config);
    }

    return Flat;
});