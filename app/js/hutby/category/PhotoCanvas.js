/**
 * Created by aliaksei on 06/08/14.
 */

define ([
    'hutby/lib/KDSplitter',
    'hutby/lib/Rectangle',
    'hutby/lib/Point',
    'hutby/lib/Utils',
    'jquery',
    'div',
    'a'
], function(
    KDSplitter,
    Rectangle,
    Point,
    Utils,
    $,
    Div,
    A
){
    function PhotoCanvas(canvasID, flat) {
        var _this = this;

        var canvas = $(canvasID);
        var elementID = '.'+canvasID.slice(1)+'-element';

        var rootRectangle;
        var kdSplitter;
        var rectangles;

        _this.show = function () {
            _this.prepareCanvas();
            _this.splitCanvas();
            _this.setPhotos();
        };

        _this.prepareCanvas = function () {
            if (Utils.isUndefined(canvas)) console.error('canvas '+canvasID+' is undefined for PhotoCanvas');
            canvas.empty();

            rootRectangle = new Rectangle(new Point(1,1), new Point(canvas.width()-1, canvas.height()-1));
            kdSplitter = new KDSplitter(rootRectangle, flat.getPhotosCount());
        };

        _this.splitCanvas = function () {
            kdSplitter.buildTree();
            rectangles = kdSplitter.rectangles();

            $.each(rectangles, function(index, rectangle) {
                canvas.append(_this.buildCanvasElement(rectangle));
            });
        };

        _this.buildCanvasElement = function (rectangle) {
            var div = new Div()
                .class(elementID.slice(1))
                .width(rectangle.width()+'px')
                .height(rectangle.height()+'px')
                .left(rectangle.origin().x()+'px')
                .top(rectangle.origin().y()+'px');

            var link = new A('#');
            return div.add(link);
        };

        _this.buildPhotoContainer = function(rectangle) {

        };

        _this.setPhotos = function () {
            $.each(canvas.find(elementID), function(index, element){
                var photo = flat.getPhoto(index);
                $(element).find('a').css('background-image', 'url('+photo+')');
            });
        };
    }

    return PhotoCanvas;
});