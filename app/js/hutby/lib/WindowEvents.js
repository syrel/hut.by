/**
 * Created by aliaksei on 03/08/14.
 */

define([''], function(){
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

    return WindowEvents;
});