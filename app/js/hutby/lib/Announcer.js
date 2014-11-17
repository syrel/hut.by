/**
 * Created by aliaksei on 07/08/14.
 */
define(['hutby/lib/Dictionary'], function(Dictionary){
    function Announcer (){
        var _this = this;

        var triggers = new Dictionary();
        var receivers = new Dictionary();

        function Notification(_on, _send, _to) {
            var _this = this;

            var on = _on;
            var send = _send;
            var to = _to;

            _this.notify = function(_ann){
                console.log(''+_this);
                return send(_ann);
            };

            _this.trigger = function () {
                return on;
            };

            _this.receiver = function () {
                return to;
            };

            _this.destroy = function () {
                on = null;
                send = null;
                to = null;
                _on = null;
                _send = null;
                _to = null;
                _this = null;
            };

            _this.toString = function () {
                return 'on: '+_on.name + ' to: '+to.constructor.name;
            };
        }

        _this.announce = function(_ann){
            if (!_this.isTriggerExists(_ann.constructor)) {
                return;
            }

            triggers.get(_ann.constructor).forEach(function(entry) {
                entry.notify(_ann);
            });
        };

        _this.onSendTo = function(_on, _send, _to){
            if (!_this.isTriggerExists(_on)) {
                triggers.put(_on, []);
            }

            if (!_this.isReceiverExists(_to)){
                receivers.put(_to, []);
            }

            var notification = new Notification(_on, _send, _to);
            triggers.get(_on).push(notification);
            receivers.get(_to).push(notification);
        };

        _this.isTriggerExists = function(trigger) {
            return triggers.isKeyExists(trigger);
        };

        _this.isReceiverExists = function (receiver) {
            return receivers.isKeyExists(receiver);
        };

        _this.notificationsOf = function(receiver) {
            return receivers.get(receiver);
        };

        _this.unsubscribe = function (_to) {
            _this.notificationsOf(_to).forEach(function(notification){
                var array = triggers.get(notification.trigger());
                var index = triggers._indexInArray(array, notification);
                triggers._removeFromArrayAt(array, index);
                notification.destroy();
            });

            receivers.remove(_to);
        };
    }

    return Announcer;


});