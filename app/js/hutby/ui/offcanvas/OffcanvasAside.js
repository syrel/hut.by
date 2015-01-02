/**
 * Created by aliaksei on 02.01.2015.
 */

define([
    'jquery',
    'hutby/ui/offcanvas/OffcanvasMenu',
    'hutby/ui/offcanvas/OffcanvasMenuFooter'
], function (
    $,
    OffcanvasMenu,
    OffcanvasMenuFooter
    ){

    function OffcanvasAside(catalog) {
        var _this = $('<aside class="columns text-left hutby-sidenav left-off-canvas-menu"></aside>');

        _this.initialize = function () {
            _this.append(new OffcanvasMenu(catalog));
            _this.append(new OffcanvasMenuFooter());
        };

        _this.initialize();

        return _this;
    }
    return OffcanvasAside;

});