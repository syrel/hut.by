/**
 * Created by aliaksei on 03/08/14.
 */

define(['jquery'], function($){
    function Global(){};

    Global.pageContentID = '#hutby-page-content';
    Global.pageContent = $(Global.pageContentID);

    Global.isPageContentVisible = function() {
        return Global.pageContent.is(':visible');
    }

    Global.oneRoomFlatsLinkID = '#hutby-one-room-flats-link';
    Global.twoRoomFlatsLinkID = '#hutby-two-room-flats-link';

    Global.oneRoomFlatsLink = $(Global.oneRoomFlatsLinkID);
    Global.twoRoomFlatsLink = $(Global.twoRoomFlatsLinkID);

    Global.headerLinkID = '#hutby-sidenav-header-link';
    Global.headerLink = $(Global.headerLinkID);

    Global.offCanvas = $('.off-canvas-wrap');

    Global.isDisplaySmall = function () {
        return matchMedia(Foundation.media_queries['small']).matches && !matchMedia(Foundation.media_queries['medium']).matches;
    };

    Global.isDisplayMedium = function () {
        return matchMedia(Foundation.media_queries['small']).matches && matchMedia(Foundation.media_queries['medium']).matches;
    };

    Global.getData = function (element) {
        return Foundation.utils.data_options(element);
    }

    return Global;
});