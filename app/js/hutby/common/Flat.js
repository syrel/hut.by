/**
 * Created by aliaksei on 03/08/14.
 */
define([
    'dictionary',
    'announcer',
    'hutby/announcements/OnFlatExpanded',
    'hutby/announcements/OnFlatCollapsed',
    'hutby/lib/Utils'
], function(Dictionary,Announcer, OnFlatExpanded, OnFlatCollapsed, Utils) {

    function Flat(_config) {

        var _this = this;

        var photos = [];
        var price;
        var currency = '$';
        var costDescription = 'от  10 суток, $60';
        var address;
        var rooms;
        var catalog;

        var isExpanded = false;

        var announcer = new Announcer();

        var overview = new function() {
            var _this = this;

            var title = 'Студия в центре';
            var article = 'Квартира-студия — тип жилого помещения, основным отличием которого является отсутствие капитальных стен или перегородок между комнатой и кухнейТакой тип жилья пришел в Россию в начале 1990-х годов с Запада. Архитектурно-планировочное решение жилья как квартиры-студии было создано Людвигом Мис ван дер Роэ в США в 1920-х годах. Пространство, полностью свободное от внутренних стен, стало очень популярно в Америке и Европе, особенно, в среде творческой молодёжи.';

            var description = ['Интернет (Wi-Fi)', 'Отчетные документы'];

            _this.printTitle = function() {
                return title;
            };

            _this.getArticle = function() {
                return article;
            };

            _this.setTitle = function(_title) {
                title = _title;
            };

            _this.setArticle = function(_article) {
                article = _article;
            };

            _this.getDescription = function () {
                return description;
            };

            _this.setDescription = function (_description) {
                description = _description;
            };
        };

        var specifications = new Dictionary();

        /**
         *
         * @param {Object} config
         * @param {int} config.rooms
         * @param {String} config.title
         * @param {Array} config.photos
         * @param {String} config.address
         * @param {int} config.price
         * @param {String} config.currency
         */
        _this.initialize = function (config) {
            if (_.isUndefined(config)) return;
            _this.setRooms(config.rooms);
            _this.address(config.address);
            _this.price(config.price);
            _this.currency(config.currency);

            if (!_.isUndefined(config.photos))
                _.each(config.photos, _this.addPhoto);

        };

        /**
         * @returns {Array}
         */
        _this.photos = function () {
            return photos;
        };

        /**
         * Adds new image to existing ones
         * @param _imagePath path to the image
         */
        _this.addPhoto = function (_imagePath) {
            photos.push(_imagePath);
        };

        /**
         * Returns photo at index
         * @param _index
         * @returns {String}
         */
        _this.photoAt = function(_index) {
            if (_index >= photos.length) return null;
            return photos[_index];
        };

        /**
         * Photo that should be used as title
         * @returns {String}
         */
        _this.titlePhoto = function () {
            return _this.photoAt(0);
        };

        /**
         * Setter/getter for price value
         * @param {int} [aNumber]
         * @returns {Flat|int}
         */
        _this.price = function(aNumber) {
            if (_.isUndefined(aNumber)) return price;
            price = aNumber;
            return _this;
        };

        /**
         * Setter/getter for price currency
         * @param {String} [aString]
         * @returns {Flat|String}
         */
        _this.currency = function(aString) {
            if (_.isUndefined(aString)) return currency;
            currency = aString;
            return _this;
        };

        /**
         * Prints price in human readable format
         * @returns {String}
         */
        _this.printPrice = function () {
            return _this.price() + _this.currency();
        };

        /**
         * Setter/getter for address
         * @param {String} [aString]
         * @returns {Flat|String}
         */
        _this.address = function (aString) {
            if (_.isUndefined(aString)) return address;
            address = aString;
            return _this;
        };


        _this.getCostDescription = function () {
            return costDescription;
        };

        _this.setCostDescription = function (_costDescription) {
            costDescription = _costDescription;
        };

        _this.getLink = function() {
            return '#';
        };

        _this.printTitle = function () {
            return Utils.capitalizeFirstLetter(_this.roomsString()) + ' по ' + _this.address();
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

        _this.getOverview = function () {
            return overview;
        };

        _this.addSpecification = function(name, specification){
            specifications.put(name, specification);
        };

        _this.getSpecifications = function(){
            return specifications;
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
            force = Utils.isUndefined(force) ? false : force;
            if (_this.isExpanded() && !force) return;
            isExpanded = true;
            var ann = new OnFlatExpanded(_this, isAnimated, true);
            _this.catalog().onFlatExpanded(ann);
            if (!wasExpanded)_this.announcer().announce(ann);
        };

        _this.initialize(_config);
    }

    Flat.Specification = function(_key, _value){
        this.key = _key;
        this.value = _value;
    };

    return Flat;
});