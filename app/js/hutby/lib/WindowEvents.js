/**
 * Created by aliaksei on 03/08/14.
 */

define([
    'hutby/common/Global',
    'announcer',
    'hutby/announcements/OnMediaSizeChanged'
], function(
    Global,
    Announcer,
    OnMediaSizeChanged){
    function WindowEvents() {}

    WindowEvents.addEvent = function(elem, type, eventHandle) {
        if (elem == null || typeof(elem) === 'undefined') return;
        if ( elem.addEventListener ) {
            elem.addEventListener( type, eventHandle, false );
        } else if ( elem.attachEvent ) {
            elem.attachEvent( "on" + type, eventHandle );
        } else {
            elem["on"+type]=eventHandle;
        }
    };

    WindowEvents.addOnResizeEvent = function (__callback) {
        WindowEvents.addEvent(window, "resize", __callback);
    };

    WindowEvents.isSmall = Global.isDisplayOnlySmall();

    WindowEvents.announcer = new Announcer();

    WindowEvents.addOnResizeEvent(function(){
        var currentIsSmall = Global.isDisplayOnlySmall();
        if (WindowEvents.isSmall !== currentIsSmall) {
            WindowEvents.isSmall = currentIsSmall;
            WindowEvents.announcer.announce(new OnMediaSizeChanged(WindowEvents.isSmall));
        }
    });

    return WindowEvents;
});