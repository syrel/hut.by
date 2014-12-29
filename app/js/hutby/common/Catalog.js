/**
 * Created by aliaksei on 03/08/14.
 */
define ([
    'hutby/common/Flat',
    'hutby/lib/Utils',
    'hutby/lib/Dictionary',
    'hutby/announcements/OnFlatExpanded',
    'hutby/announcements/OnFlatCollapsed',
    'hutby/announcements/OnCategoryExpanded',
    'hutby/announcements/OnCategoryCollapsed',
    'hutby/announcements/OnCategoryPreviewShow',
    'hutby/announcements/OnCategoryPreviewHide',
    'hutby/lib/Announcer'

], function(
    Flat,
    Utils,
    Dictionary,
    OnFlatExpanded,
    OnFlatCollapsed,
    OnCategoryExpanded,
    OnCategoryCollapsed,
    OnCategoryPreviewShow,
    OnCategoryPreviewHide,
    Announcer
){

    function Catalog() {
        var _this = this;

        var flats = new Dictionary();
        var announcer = new Announcer();
        var count = 0;

        var expandedCategory = null;
        var expandedFlat = null;

        _this.addFlat = function (flat) {
            if (!flats.isKeyExists(flat.getRooms())) {
                flats.put(flat.getRooms(), []);
            }

            flats.get(flat.getRooms()).push(flat);
            flat.announcer().onSendTo(OnFlatExpanded, _this.onFlatExpanded, _this);
            flat.announcer().onSendTo(OnFlatCollapsed, _this.onFlatCollapsed, _this);
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

        _this.onFlatExpanded = function(ann) {
            expandedFlat = ann.flat();
            _this.announcer().announce(ann);
        };

        _this.onFlatCollapsed = function(ann) {
            expandedFlat = null;
            _this.announcer().announce(ann);
        };

        _this.expandedCategory = function () {
            return expandedCategory;
        };

        _this.expandedFlat = function () {
            return expandedFlat;
        };

        _this.isFlatExpanded = function () {
            return !Utils.isUndefined(_this.expandedFlat());
        };

        _this.isCategoryExpanded = function () {
            return !Utils.isUndefined(_this.expandedCategory());
        };

        _this.collapseCategory = function (animated) {
            var category = expandedCategory;
            expandedCategory = null;
            _this.announcer().announce(new OnCategoryCollapsed(category, animated));
        };

        _this.expandCategory = function (rooms, animated) {
            if (_this.expandedCategory() !== rooms) {
                expandedCategory = rooms;
                if(_this.isFlatExpanded()) {
                    _this.expandedFlat().collapse();
                }
                _this.flats(_this.expandedCategory())[0].expand();
                _this.announcer().announce(new OnCategoryExpanded(rooms, animated));
            }
        };

        _this.showCategoryPreview = function (rooms, anchor) {
            _this.announcer().announce(new OnCategoryPreviewShow(rooms, anchor));
        };

        _this.hideCategoryPreview = function (rooms, anchor) {
            _this.announcer().announce(new OnCategoryPreviewHide(rooms, anchor));
        };

        _this.announcer = function(){
            return announcer;
        };
    }
    return Catalog;
});