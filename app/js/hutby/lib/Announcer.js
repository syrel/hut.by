/**
 * Created by aliaksei on 07/08/14.
 */
define([], function(){
    function Announcer (){
        var _this = this;

        function Notification(_to) {
            var _this = this;

            var to = _to;

            _this.notify = function(send){
                return to(send);
            };
        }

        var listeners = {};

        _this.announce = function(_ann){
            if (!_this.isTriggerExists(_ann.constructor)) {
                return;
            }

            listeners[_ann.constructor].forEach(function(entry) {
                entry.notify(_ann);
            });
        };

        _this.onSendTo = function(_on, _to){
            if (!_this.isTriggerExists(_on)) {
                listeners[_on] = [];
            }

            listeners[_on].push(new Notification(_to));
        };

        _this.isTriggerExists = function(trigger) {
            return (typeof(listeners[trigger]) !== 'undefined') && (listeners[trigger] !== null);
        };
    }

    return Announcer;


});