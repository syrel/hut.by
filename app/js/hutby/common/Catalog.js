/**
 * Created by aliaksei on 03/08/14.
 */
define ([
    'hutby/common/Flat',
    'hutby/lib/Utils',
    'dictionary',
    'hutby/lib/WindowEvents',
    'hutby/announcements/OnFlatExpanded',
    'hutby/announcements/OnFlatCollapsed',
    'hutby/announcements/OnCategoryExpanded',
    'hutby/announcements/OnCategoryCollapsed',
    'hutby/announcements/OnCategoryPreviewShow',
    'hutby/announcements/OnCategoryPreviewHide',
    'hutby/announcements/OnMediaSizeChanged',
    'announcer'

], function(
    Flat,
    Utils,
    Dictionary,
    WindowEvents,
    OnFlatExpanded,
    OnFlatCollapsed,
    OnCategoryExpanded,
    OnCategoryCollapsed,
    OnCategoryPreviewShow,
    OnCategoryPreviewHide,
    OnMediaSizeChanged,
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
            flat.setCatalog(_this);
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
            var theSame = _this.expandedFlat() === ann.flat();
            if(_this.isFlatExpanded()) {
                if (!theSame)
                    _this.expandedFlat().collapse();
            }
            expandedFlat = ann.flat();
            if (!_this.isCategoryExpanded() || _this.expandedCategory() !== ann.flat().getRooms()) {
                _this.expandCategory(ann.flat().getRooms(), _this.isCategoryExpanded(), false);
            }
            if (!theSame) _this.announcer().announce(ann);
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

        /**
         * Tests if any flat is expanded.
         * @returns {boolean} - true if flat is expanded. Otherwise false
         */
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

        _this.expandCategory = function (rooms, animated, expandFlat) {
            expandFlat = Utils.isUndefined(expandFlat) ? true : expandFlat;
            if (_this.expandedCategory() !== rooms) {
                expandedCategory = rooms;
                if (expandFlat && !WindowEvents.isSmall)
                    _this.flats(_this.expandedCategory())[0].expand(animated);
                _this.announcer().announce(new OnCategoryExpanded(rooms, animated));
            }
        };

        /**
         * Notifies all listeners that it is necessary to show category preview
         * @param rooms - category preview to show
         * @param anchor - an anchor element, that should be used to position preview
         */
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