/**
 * Created by aliaksei on 03/08/14.
 */
define(['hutby/lib/Dictionary','hutby/lib/Utils'], function(Dictionary, Utils) {

    function Flat() {

        var _this = this;

        var photos = [];
        var cost;
        var address;
        var rooms;
        var index;

        var overview = new function(){
            var _this = this;

            var title = 'Студия в центре';
            var article = 'Квартира-студия — тип жилого помещения, основным отличием которого является отсутствие капитальных стен или перегородок между комнатой и кухнейТакой тип жилья пришел в Россию в начале 1990-х годов с Запада. Архитектурно-планировочное решение жилья как квартиры-студии было создано Людвигом Мис ван дер Роэ в США в 1920-х годах. Пространство, полностью свободное от внутренних стен, стало очень популярно в Америке и Европе, особенно, в среде творческой молодёжи.';


            _this.getTitle = function() {
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
        };

        var specifications = new Dictionary();

        /**
         * Adds new image to existing ones
         * @param $image path to the image
         */
        _this.addPhoto = function (_imagePath) {
            photos.push(_imagePath);
        };

        _this.getPhoto = function(_index) {
            if (_index >= photos.length) return null;
            return photos[_index];
        };

        _this.getCost = function() {
            return cost;
        };

        _this.setCost = function(_cost) {
            cost = _cost;
        };

        _this.getAddress = function() {
            return address;
        };

        _this.setAddress = function(_address) {
            address = _address;
        };

        _this.getLink = function() {
            return '#';
        };

        _this.setIndex = function (_index) {
            index = _index;
        };

        _this.getIndex = function () {
            return index;
        };

        _this.getTitle = function () {
            return Utils.capitalizeFirstLetter(_this.roomsString()) + ' по ' + _this.getAddress();
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
    }

    Flat.Specification = function(_key, _value){
        this.key = _key;
        this.value = _value;
    };

    return Flat;
});