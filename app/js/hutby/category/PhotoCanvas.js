/**
 * Created by aliaksei on 06/08/14.
 */

define ([
    'hutby/lib/KDSplitter',
    'hutby/lib/Rectangle',
    'hutby/lib/Point',
    'hutby/lib/Utils',
    'jquery',
    'vendor/photoswipe',
    'vendor/photoswipe-ui-default'
], function(
    KDSplitter,
    Rectangle,
    Point,
    Utils,
    $,
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
                canvas.append($(_this.buildCanvasElement(rectangle)));
            });
        };

        _this.buildCanvasElement = function (rectangle) {
            return '<div class="'+elementID.slice(1)+'" style="left: ' + rectangle.origin().x() + 'px; top: ' + rectangle.origin().y() + 'px; width: ' + rectangle.width() + 'px; height: ' + rectangle.height() + 'px;"><a href="#"></a></div>';
        };

        _this.setPhotos = function () {
            $.each(canvas.find(elementID), function(index, element){
                var photo = flat.photoAt(index);
                $(element).find('a').css('background-image', 'url('+photo+')').click(function(e){
                    e.preventDefault();
                    var pswpElement = document.querySelectorAll('.pswp')[0];
                    var items = _.map(flat.photos(), function(each){
                        return { src: each, w: 2880, h: 1920 }
                    });

                    var options = {
                        // optionName: 'option value'
                        // for example:
                        index: 0 // start at first slide
                    };
                    var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
                    gallery.init();
                });
            });
        };
    }

    return PhotoCanvas;
});