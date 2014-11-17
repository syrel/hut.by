/**
 * Created by aliaksei on 03/08/14.
 */
define ([
    'hutby/common/Flat',
    'hutby/lib/Dictionary',
    'hutby/lib/Announcer'

], function(
    Flat,
    Dictionary,
    Announcer
){

    function Catalog() {
        var _this = this;

        var flats = new Dictionary();
        var announcer = new Announcer();
        var count = 0;

        _this.addFlat = function (flat) {
            if (!flats.isKeyExists(flat.getRooms())) {
                flats.put(flat.getRooms(), []);
            }

            flats.get(flat.getRooms()).push(flat);
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

        _this.announcer = function(){
            return announcer;
        };
    }
    return Catalog;
});