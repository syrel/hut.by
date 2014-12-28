/**
 * Created by aliaksei on 03/08/14.
 */
define ([
    'hutby/common/Flat',
    'hutby/lib/Dictionary',
    'hutby/announcements/OnFlatExpanded',
    'hutby/announcements/OnCategoryExpanded',
    'hutby/lib/Announcer'

], function(
    Flat,
    Dictionary,
    OnFlatExpanded,
    OnCategoryExpanded,
    Announcer
){

    function Catalog() {
        var _this = this;

        var flats = new Dictionary();
        var announcer = new Announcer();
        var count = 0;

        var expandedCategory = null;

        _this.addFlat = function (flat) {
            if (!flats.isKeyExists(flat.getRooms())) {
                flats.put(flat.getRooms(), []);
            }

            flats.get(flat.getRooms()).push(flat);
            flat.announcer().onSendTo(OnFlatExpanded, _this.oFlatExpanded, _this);
            count++;
        };

        _this.flats = function (rooms) {
            return flats.get(rooms);
        };

        _this.allFlats = function (){
            var array = [];
            flats.each(function(key,value){
                array = array.concat(value);
            });
            return array;
        };

        _this.possibleRooms = function () {
            return flats.keys();
        };

        _this.oFlatExpanded = function(ann) {
            _this.announcer().announce(ann);
        };

        _this.expandedCategory = function () {
            return expandedCategory;
        };

        _this.expandCategory = function (rooms, animated) {
            if (_this.expandedCategory() !== rooms) {
                expandedCategory = rooms;
                _this.announcer().announce(new OnCategoryExpanded(rooms, animated));
            }
        };

        _this.announcer = function(){
            return announcer;
        };
    }
    return Catalog;
});