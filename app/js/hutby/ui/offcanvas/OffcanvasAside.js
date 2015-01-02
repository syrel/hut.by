/**
 * Created by aliaksei on 02.01.2015.
 */

define([
    'jquery',
    'hutby/lib/WindowEvents',
    'hutby/announcements/OnMediaSizeChanged',
    'hutby/announcements/OnFlatExpanded',
    'hutby/ui/offcanvas/OffcanvasMenu',
    'hutby/ui/offcanvas/OffcanvasMenuFooter'
], function (
    $,
    WindowEvents,
    OnMediaSizeChanged,
    OnFlatExpanded,
    OffcanvasMenu,
    OffcanvasMenuFooter
    ){

    function OffcanvasAside(catalog) {
        var _this = $('<aside class="columns text-left hutby-sidenav left-off-canvas-menu"></aside>');

        _this.initialize = function () {
            _this.append(new OffcanvasMenu(catalog));
            _this.append(new OffcanvasMenuFooter());
            _this.updateOffcanvasWidth();
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
            if (WindowEvents.isSmall && !catalog.isCategoryExpanded()) {
                _this.addClass('left-off-canvas-menu-full-width');
            } else _this.removeClass('left-off-canvas-menu-full-width');
        };

        _this.initialize();

        return _this;
    }
    return OffcanvasAside;

});