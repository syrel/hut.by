/**
 * Created by aliaksei on 31.12.2014.
 */


define(['jquery'],function($){
    function PagerPhoto () {
        var _this = $('<div class="hutby-flat-pager-photo"></div>');

        _this.setPhoto = function (imagePath) {
            _this.css('background-image', 'url(' + imagePath + ')');
            return _this;
        };

        _this.beActive = function () {
            _this.addClass('active');
        };

        return _this;
    }
    return PagerPhoto;
});