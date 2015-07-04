/**
 * Created by aliaksei on 03/08/14.
 */

define([], function(){
    function Global(){}

    Global.pageContentID = '.hutby-page-content';

    Global.phone = "+375 29 399 00 21";

    Global.registerPageContent = function(content) {
        Global.pageContent = content;
    };

    Global.isPageContentVisible = function() {
        return Global.pageContent.is(':visible');
    };

    Global.isDisplaySmall = function () {
        return matchMedia(Foundation.media_queries['small']).matches && !matchMedia(Foundation.media_queries['medium']).matches;
    };

    Global.isDisplayMedium = function () {
        return matchMedia(Foundation.media_queries['small']).matches && matchMedia(Foundation.media_queries['medium']).matches;
    };

    Global.isDisplayOnlySmall = function () {
        return Global.isDisplaySmall() && !Global.isDisplayMedium();
    };

    Global.getData = function (element) {
        return Foundation.utils.data_options(element);
    };

    return Global;
});