define([], function(){

    function Image(_config) {
        var _this = this;

        var path;
        var width;
        var height;
        var media;

        /**
         * @param {Object} config
         * @param {String} config.path
         * @param {String} config.media
         * @param {int} config.width
         * @param {int} config.height
         */
        _this.initialize = function(config) {
            if (_.isUndefined(config)) return;
            path = config.path;
            media = config.media;
            width = config.width;
            height = config.height;
        };

        _this.isApplicable = function () {
            return Foundation.utils["is_" + _this.media()]();
        };

        _this.width = function () {
            return width;
        };

        _this.height = function () {
            return height;
        };

        _this.path = function () {
            return path;
        };

        _this.media = function () {
            return media;
        };

        _this.initialize(_config);
    }

    /**
     *
     * @param _config
     * @constructor
     * @class Photo
     */
    function Photo(_config) {
        var _this = this;

        var images = [];
        var thumbnail;

        /**
         * @param {Object} config
         * @param {Object} config.thumbnail
         * @param {Array} config.images
         */
        _this.initialize = function (config) {
            thumbnail = new Image(config.thumbnail);
            images = _.map(config.images, function(each){
                return new Image(each);
            })
        };

        /**
         * @param {Object} image
         * @param {String} image.path
         * @param {String} image.media
         * @param {int} image.width
         * @param {int} image.height
         */
        _this.add = function (image) {
            images.push(new Image(image));
        };

        _this.thumbnail = function() {
            return thumbnail.path();
        };

        _this.image = function () {
            return _.find(_this.images(), function(each) {
                return each.isApplicable();
            });
        };

        _this.path = function () {
            return _this.image().path();
        };

        _this.images = function() {
            return images;
        };

        _this.initialize(_config);
    }

    return Photo;
});