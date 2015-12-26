/**
 * Created by aliaksei on 02.01.2015.
 */

define([
    'jquery',
    'aside',
    'hutby/lib/WindowEvents',
    'hutby/announcements/OnMediaSizeChanged',
    'hutby/announcements/OnFlatExpanded',
    'hutby/ui/offcanvas/OffcanvasMenu',
    'hutby/ui/offcanvas/OffcanvasMenuFooter'
], function (
    $,
    Aside,
    WindowEvents,
    OnMediaSizeChanged,
    OnFlatExpanded,
    OffcanvasMenu,
    OffcanvasMenuFooter
    ){

    function OffcanvasAside(catalog) {
        var _this = new Aside();
        var fullWidthClass;

        _this.initialize = function () {
            _this
                .class('columns')
                .class('text-left')
                .class('hutby-sidenav')
                .class('left-off-canvas-menu')
                .add(new OffcanvasMenu(catalog))
                .add(new OffcanvasMenuFooter())
                .updateOffcanvasWidth();

            WindowEvents.announcer.onSendTo(OnMediaSizeChanged, _this.onMediaSizeChanged, _this);
            catalog.announcer().onSendTo(OnFlatExpanded, _this.onFlatExpanded, _this);
        };

        _this.onMediaSizeChanged = function () {
            _this.updateOffcanvasWidth();
        };

        _this.onFlatExpanded = function () {
            _this.updateOffcanvasWidth();
        };

        _this.updateOffcanvasWidth = function () {
            console.log('updateOffcanvasWidth '+ WindowEvents.isSmall + ' '+!catalog.isCategoryExpanded());
            if (WindowEvents.isSmall && !catalog.isCategoryExpanded()) {
                _this.class(_this.fullWidthClass());
            } else _this.removeClass(_this.fullWidthClass());
        };

        /**
         * Returns class name for full width. If class name is undefined
         * creates such class with defined properties.
         * @return {*}
         */
        _this.fullWidthClass = function () {
            if (!fullWidthClass) {
                fullWidthClass = _this.createClass({
                    'width': "100% !important",
                    'max-width': "100% !important"
                });
            }
            return fullWidthClass;
        };

        _this.initialize();

        return _this;
    }
    return OffcanvasAside;

});