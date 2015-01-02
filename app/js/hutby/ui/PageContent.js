/**
 * Created by aliaksei on 02.01.2015.
 */

define([
    'jquery',
    'hutby/common/Global',
    'hutby/ui/offcanvas/OffcanvasMobilePageHeader'
], function(
    $,
    Global,
    OffcanvasMobilePageHeader ){

    function PageContent(catalog) {
        var _this = $('<div class="hutby-page-content-wrapper"></div>');
        var content = $('<div class="columns hutby-page-content"></div>');

        _this.initialize = function() {
            content.append(new OffcanvasMobilePageHeader(catalog));
            _this.append(content);
            Global.registerPageContent(content);
        };

        _this.initialize();

        return _this;
    }
    return PageContent;

});