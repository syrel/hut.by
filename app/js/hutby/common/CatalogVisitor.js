/**
 * Created by aliaksei on 27/12/15.
 */
define([], function () {
    function CatalogVisitor() {
        var _this = this;

        _this.visitCatalog = function(catalog) {

        };

        _this.visitFlat = function (flat) {

        };

        _this.visitPrice = function (price) {

        };

        _this.visitOverview = function (overview) {

        };

        _this.visitPhoto = function (photo) {

        };

        _this.visitImage = function (image) {

        };

        _this.visit = function(visitable) {
            visitable.accept(_this);
        };
    }

    return CatalogVisitor;
});