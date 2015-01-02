/**
 * Created by aliaksei on 28.12.2014.
 */

define([
    'jquery',
    'hutby/lib/WindowEvents',
    'hutby/announcements/OnMediaSizeChanged',
    'hutby/announcements/OnFlatExpanded',
    'hutby/ui/offcanvas/OffcanvasAside',
    'hutby/ui/PageContent',
    'hutby/common/Global'

],function(
    $,
    WindowEvents,
    OnMediaSizeChanged,
    OnFlatExpanded,
    OffcanvasAside,
    PageContent,
    Global){
    function Offcanvas(catalog) {
        var _this = $('<div class="row hutby-page off-canvas-wrap" data-offcanvas></div>');
        var innerWrap = $('<div class="inner-wrap"></div>');
        var offcanvasExit = $('<a id="exit-off-canvas" class="exit-off-canvas"></a>');

        var visibilityClass = 'offcanvas-overlap';

        _this.initialize = function () {
            innerWrap.append(new OffcanvasAside(catalog));
            innerWrap.append(new PageContent());
            innerWrap.append(offcanvasExit);
            _this.append(innerWrap);
            _this.updateOffcanvas();
            WindowEvents.announcer.onSendTo(OnMediaSizeChanged, _this.onMediaSizeChanged, _this);
            catalog.announcer().onSendTo(OnFlatExpanded, _this.onFlatExpanded, _this);
        };

        _this.onMediaSizeChanged = function () {
            if (!WindowEvents.isSmall) {
                _this.showOffcanvas();
            }
        };

        _this.onFlatExpanded = function () {
            _this.hideOffcanvas();
        };

        _this.updateOffcanvas = function () {
            _this.showOffcanvas();
        };

        _this.showOffcanvas = function () {
            _this.addClass(visibilityClass);
        };

        _this.hideOffcanvas = function () {
            if (Global.isDisplayOnlySmall()) setTimeout(function(){
                _this.removeClass(visibilityClass);
            }, 0);
        };

        _this.isOffCanvasVisible = function () {
            return _this.hasClass(visibilityClass);
        };

        _this.initialize();

        return _this;
    }
    return Offcanvas;
});