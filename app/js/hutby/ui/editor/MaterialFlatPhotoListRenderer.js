/**
 * Created by aliaksei on 27/12/15.
 */
define([
    'hutby/common/CatalogVisitor'
], function(
    CatalogVisitor
    ){

    function MaterialFlatPhotoListRenderer(){
        var _this = new CatalogVisitor();

        var html = $('<div class="demo-charts mdl-cell mdl-cell--12-col mdl-grid"></div>');
        var wrapper = $('<div class="mdl-cell mdl-cell--12-col mdl-grid mdl-color--white mdl-shadow--2dp"></div>');

        html.append(wrapper);

        _this.html = function(){
            return html;
        };

        /**
         * @param photo {Photo}
         */
        _this.visitPhoto = function(photo) {
            var image = $(
                '<div class="demo-card-image mdl-card mdl-shadow--2dp">'+
                    '<div class="mdl-card__title mdl-card--expand"></div>'+
                    '<div class="mdl-card__actions">'+
                        '<span class="demo-card-image__filename">'+photo.alt()+'</span>'+
                    '</div>'+
                '</div>');

            image.css("background","url('"+photo.thumbnail().path()+"') center / cover");
            wrapper.append(image);
        };

        return _this;
    }

    return MaterialFlatPhotoListRenderer;

});