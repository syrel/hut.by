/**
 * Created by aliaksei on 06/08/14.
 */

define ([
    'hutby/lib/KDSplitter',
    'hutby/lib/Rectangle',
    'hutby/lib/Point',
    'utils',
    'jquery',
    'div',
    'a',
    'vendor/photoswipe',
    'vendor/photoswipe-ui-default'
], function(
    KDSplitter,
    Rectangle,
    Point,
    Utils,
    $,
    Div,
    A,
    PhotoSwipe,
    PhotoSwipeUI_Default
) {
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
                var photo = flat.photoAt(index);
                $(element).find('a').css('background-image', 'url('+photo.path()+')').click(function(e){
                    e.preventDefault();
                    var pswpElement = document.querySelectorAll('.pswp')[0];
                    var items = _.map(flat.photos(), function(each){
                        var image = each.image();
                        return { src: image.path(), w: image.width(), h: image.height() }
                    });

                    var options = {
                        index: index
                    };
                    var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
                    gallery.init();
                });
            });
        };
    }

    return PhotoCanvas;
});