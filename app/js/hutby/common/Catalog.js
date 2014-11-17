/**
 * Created by aliaksei on 03/08/14.
 */
define (['hutby/common/Flat', 'hutby/lib/Announcer'], function(Flat, Announcer){
    function Catalog(){
        var _this = this;

        var announcer = new Announcer();

        var flats = {
            oneRoom: [],
            twoRoom: []
        };

        _this.addOneRoomFlat = function(flat){
            flat.setIndex(flats.oneRoom.length);
            flats.oneRoom.push(flat);
            flat.setRooms(1);
        };

        _this.addTwoRoomFlat = function(flat){
            flat.setIndex(flats.twoRoom.length);
            flats.twoRoom.push(flat);
            flat.setRooms(2);
        };

        _this.oneRoomFlats = function() {
            return flats.oneRoom;
        };

        _this.twoRoomFlats = function () {
            return flats.twoRoom;
        };

        _this.allFlats = function() {
            return flats.oneRoom.concat(flats.twoRoom);
        };

        _this.roomFlats = function (_rooms) {
            switch (_rooms){
                case 1 : return flats.oneRoom;
                case 2 : return flats.twoRoom;
            }
        };

        _this.announcer = function(){
            return announcer;
        };
    }
    return Catalog;
});