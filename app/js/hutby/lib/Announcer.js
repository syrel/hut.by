/**
 * Created by Aliaksei Syrel on 07/08/14.
 */

"use strict";
define(['hutby/lib/Dictionary'], function(Dictionary){

    function Notification(on, send, to) {
        this._on = on;
        this._send = send;
        this._to = to;
    }

    Notification.prototype = (function(){
        return {
            notify : function(ann) {
                return this._send(ann);
            },

            trigger : function () {
                return this._on;
            },

            receiver : function () {
                return this._to;
            },

            destroy : function () {
                this._on = null;
                this._send = null;
                this._to = null;
            },

            toString : function () {
                return 'on: '+this._on.name + ' to: '+this._to.constructor.name;
            }
        }
    })();

    function Announcer() {
        this._triggers = new Dictionary();
        this._receivers = new Dictionary();
    }

    Announcer.prototype = (function(){

        function isTriggerExists(trigger) {
            return this._triggers.isKeyExists(trigger);
        }

        function isReceiverExists(receiver) {
            return this._receivers.isKeyExists(receiver);
        }

        function notificationsOf(receiver) {
            return this._receivers.get(receiver);
        }

        return {
            announce : function(ann){
                if (!this._(isTriggerExists)(ann.constructor)) {
                    return;
                }

                this._triggers.get(ann.constructor).forEach(function(entry) {
                    entry.notify(ann);
                });
            },

            onSendTo : function(on, send, to){
                if (!this._(isTriggerExists)(on)) {
                    this._triggers.put(on, []);
                }

                if (!this._(isReceiverExists)(to)){
                    this._receivers.put(to, []);
                }

                var notification = new Notification(on, send, to);
                this._triggers.get(on).push(notification);
                this._receivers.get(to).push(notification);
            },

            unsubscribe : function (to) {
                var me = this;
                this._(notificationsOf)(to).forEach(function(notification){
                    var array = me._triggers.get(notification.trigger());
                    var index = Dictionary.indexInArray(array, notification);
                    Dictionary.removeFromArrayAt(array, index);
                    notification.destroy();
                });

                this._receivers.remove(to);
            },

            _:function(callback){
                var self = this;
                return function(){
                    return callback.apply(self, arguments);
                };
            }
        };
    })();

    return Announcer;
});