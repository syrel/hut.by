/**
 * Created by aliaksei on 27/12/15.
 */
define([
    'hutby/common/CatalogVisitor'
], function(
    CatalogVisitor
    ){

    function MaterialFlatListRenderer(){
        var _this = new CatalogVisitor();

        var html = $('<nav class="demo-navigation mdl-navigation mdl-color--blue-grey-800"></nav>');

        _this.html = function(){
            return html;
        };

        /**
         * @param flat {Flat}
         */
        _this.visitFlat = function(flat) {
            var link = $('<a class="mdl-navigation__link" href="">'+flat.address()+'</a>');
            html.append(link);
        };

        return _this;
    }
    return MaterialFlatListRenderer;
});