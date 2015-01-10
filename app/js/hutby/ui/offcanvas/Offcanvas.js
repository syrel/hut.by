/**
 * Created by aliaksei on 28.12.2014.
 */

define([
    'jquery',
    'div',
    'hutby/lib/WindowEvents',
    'hutby/announcements/OnMediaSizeChanged',
    'hutby/announcements/OnFlatExpanded',
    'hutby/ui/offcanvas/OffcanvasAside',
    'hutby/ui/offcanvas/OffcanvasFade',
    'hutby/ui/PageContent',
    'hutby/common/Global'

],function(
    $,
    Div,
    WindowEvents,
    OnMediaSizeChanged,
    OnFlatExpanded,
    OffcanvasAside,
    OffcanvasFade,
    PageContent,
    Global){
    function Offcanvas(catalog) {
        var _this = new Div();
        var innerWrap = new Div();

        var visibilityClass = 'offcanvas-overlap';

        _this.initialize = function () {
            innerWrap
                .class('inner-wrap')
                .add(new OffcanvasAside(catalog))
                .add(new PageContent(catalog))
                .add(new OffcanvasFade());

            _this
                .class('row')
                .class('hutby-page')
                .class('off-canvas-wrap')
                .attr('data-offcanvas','')
                .add(innerWrap)
                .showOffcanvas();

            WindowEvents.announcer.onSendTo(OnMediaSizeChanged, _this.onMediaSizeChanged, _this);
            catalog.announcer().onSendTo(OnFlatExpanded, _this.onFlatExpanded, _this);
        };

        /**
         * And action to be executed when window media size
         * is changed. If webpage switches from mobile mode
         * offcanvas should be visible
         */
        _this.onMediaSizeChanged = function () {
            if (!WindowEvents.isSmall) {
                _this.showOffcanvas();
            }
        };

        /**
         * An action be executed after any flat is expanded.
         * In current particular case it hides offcanvas.
         */
        _this.onFlatExpanded = function () {
            _this.hideOffcanvas();
        };

        /**
         * Opens hidden offcanvas. In most use cases
         * I'm used in mobile mode
         */
        _this.showOffcanvas = function () {
            _this.class(visibilityClass);
        };

        /**
         * Hides offcanvas if and only if opened in mobile mode
         */
        _this.hideOffcanvas = function () {
            if (Global.isDisplayOnlySmall()) setTimeout(function(){
                _this.removeClass(visibilityClass);
            }, 0);
        };

        /**
         * Checks if offcanvas is visible.
         * @returns {boolean} - true if offcanvas visible,
         *                    - false otherwise
         */
        _this.isOffCanvasVisible = function () {
            return _this.hasClass(visibilityClass);
        };

        _this.initialize();

        return _this;
    }
    return Offcanvas;
});