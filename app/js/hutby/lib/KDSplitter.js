/**
 * Created by aliaksei on 03/08/14.
 */

define(['hutby/lib/PriorityQueue'], function (PriorityQueue) {

    function KDSplitter(_rectangle, _num) {
        var _this = this;

        var rectangle = _rectangle;
        var num = _num;

        var alreadySplitted;

        var nodes;

        _this.buildTree = function () {
            alreadySplitted = 1;
            nodes = new PriorityQueue(function (a, b) {
                return a.square() - b.square();
            });

            var rootNode = new Node(rectangle);
            nodes.enq(rootNode);
            build();
        }

        _this.rectangles = function () {
            var rectangles = [];
            while (nodes.size() > 0) {
                rectangles.push(nodes.deq().rectangle());
            }
            return rectangles;
        }

        function Node(_rectangle) {
            var _this = this;
            var rectangle = _rectangle;

            var left = null;
            var right = null;

            var isSplitted = false;

            _this.rectangle = function () {
                return rectangle;
            }

            _this.setLeft = function (_left) {
                left = _left;
            }

            _this.setRight = function (_right) {
                right = _right;
            }

            _this.left = function () {
                return left;
            }

            _this.right = function () {
                return right;
            }

            _this.split = function () {
                var rectangles = rectangle.split();
                _this.setLeft(new Node(rectangles[0]));
                _this.setRight(new Node(rectangles[1]));
                isSplitted = true;
            }

            _this.isSplitted = function () {
                return isSplitted;
            }

            _this.square = function () {
                return rectangle.square();
            }
        }

        var build = function () {
            if (alreadySplitted >= num) return;
            var node = nodes.deq();

            node.split();
            alreadySplitted = alreadySplitted + 1;

            nodes.enq(node.left());
            nodes.enq(node.right());

            build();
        }
    }

    return KDSplitter;
});


