/**
 * Created by aliaksei on 02.01.2015.
 */

define(['jquery'], function($){
    function OffcanvasMobilePageHeader(catalog) {
        var _this = $('<nav class="tab-bar show-for-small-only">'+
        '<section class="left-small">'+
        '<a class="left-off-canvas-toggle menu-icon" href="#"><span></span></a>'+
        '</section>'+

        '<section class="middle tab-bar-section">'+
            '<h1 class="title">Hut.by</h1>'+
        '</section>'+
        '</nav>');

        _this.initialize = function() {
            _this.find('.left-off-canvas-toggle').click(function(e){
                if (!catalog.isFlatExpanded()) {
                    e.preventDefault();
                    return false;
                }
            });
        };

        _this.initialize();

        return _this;
    }
    return OffcanvasMobilePageHeader;
});