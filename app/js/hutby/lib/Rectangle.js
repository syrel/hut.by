/**
 * Created by aliaksei on 03/08/14.
 */

define(['hutby/lib/Point'], function(Point){
    function Rectangle(_origin, _corner) {
        var splitInterval = 0;
        var splitTransition = 0;

        var _this = this;
        var origin = _origin;
        var corner = _corner;

        _this.origin = function() {
            return origin;
        }

        _this.corner = function() {
            return corner;
        }

        _this.width = function() {
            return corner.x() - origin.x();
        }

        _this.height = function() {
            return corner.y() - origin.y();
        }

        _this.split = function() {
            return _this.isVertical() ? _this.splitHorizontalRandom() : _this.splitVerticalRandom();
        }

        _this.splitVertical = function(coord) {
            return [
                new Rectangle(origin.copy(), new Point(coord, corner.y())),
                new Rectangle(new Point(coord, origin.y()), corner.copy())
            ];
        }

        _this.splitVerticalRandom = function() {
            return _this.splitVertical(getSplitCoordinate(origin.x(), corner.x()));
        }

        _this.splitHorizontal = function(coord) {
            return [
                new Rectangle(origin.copy(), new Point(corner.x(), coord)),
                new Rectangle(new Point(origin.x(), coord), corner.copy())
            ];
        }

        _this.splitHorizontalRandom = function() {
            return _this.splitHorizontal(getSplitCoordinate(origin.y(), corner.y()));
        }

        _this.isVertical = function() {
            return _this.height() > _this.width();
        }

        _this.isHorizontal = function() {
            return !_this.isVertical();
        }

        _this.square = function() {
            return _this.height() * _this.width();
        }

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        }

        function getSplitCoordinate(min, max) {
            var halfInterval = (max - min) * splitInterval / 2;
            var move = (max - min) * splitTransition;
            var start = move + min + (max - min) / 2 - halfInterval;
            var finish = move + min + (max - min) / 2 + halfInterval;
            return getRandomInt(
                Math.min(max, Math.max(min, start)),
                Math.min(max, Math.max(min, finish))
            );
        }
    }
    return Rectangle;
});

