/**
 * Created by aliaksei on 03/08/14.
 */

define(['jquery'], function($){
    function Global(){};

    Global.pageContentID = '.hutby-page-content';

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

    Global.getData = function (element) {
        return Foundation.utils.data_options(element);
    };

    return Global;
});