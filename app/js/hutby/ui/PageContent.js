/**
 * Created by aliaksei on 02.01.2015.
 */

define([
    'jquery',
    'div',
    'hutby/common/Global',
    'hutby/ui/offcanvas/OffcanvasMobilePageHeader',
    'polymorphism'
], function(
    $,
    Div,
    Global,
    OffcanvasMobilePageHeader ){

    function PageContent(catalog) {
        var _this = new Div().class('hutby-page-content-wrapper');
        var content = new Div().class('columns').class('hutby-page-content');

        /**
         * Initializing method, executed during object construction
         */
        _this.initialize = override(_this.initialize,function() {
            this.super();
            content.append(new OffcanvasMobilePageHeader(catalog));
            _this.append(content);
            Global.registerPageContent(content);
        });

        _this.initialize();

        return _this;
    }
    return PageContent;

});