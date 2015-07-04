/**
 * Created by aliaksei on 06/08/14.
 */

define([
    'hutby/category/FlatDescriptionViewHolder',
    'hutby/category/PhotoCanvas',
    'hutby/category/FlatOverview',
    'hutby/lib/Utils',
    'hutby/common/Global'], function(
    FlatDescriptionViewHolder,
    PhotoCanvas,
    FlatOverview,
    Utils,
    Global) {

    function FlatDescription(category, flat, prefix) {
        var _this = this;

        var resizeEventID = 'resize.flat-description';

        var holder = new FlatDescriptionViewHolder(prefix);

        var photoCanvas;

        _this.prepare = function (animate, _callback) {
            // clear and remove all possible previous divs

            animate = Utils.isUndefined(animate) ? true : animate;

            if (!Utils.isUndefined(holder.container())) {
                var duration = animate ? 0.4 : 0;
                if (Global.isDisplaySmall()) duration = 0;

                holder.container().animo({ animation: 'zoomOutLeft', duration: duration }, function(){
                    if (!Utils.isUndefined(holder.container())) holder.container().remove();
                    holder = new FlatDescriptionViewHolder(prefix);
                    Utils.call(_callback);
                });
            }
            else Utils.call(_callback);
        };

        _this.show = function (animate, _callback) {
            _this.prepare(animate, function(){
                _this.createContainer();
                _this.createOverviewSection();

                _this.initializePhotoCanvas();

                _this.createSpecifications();

                _this.initializeEvents();

                _this.fadeIn(_callback);
            });
        };

        _this.createContainer = function () {
            category.holder().container().append($(_this.buildContainer()).css('visibility', 'hidden'));
        };

        _this.createTitle = function () {
            holder.container().append($(_this.buildTitle()));
        };

        _this.createOverviewSection = function () {
            holder.container().append($(_this.buildOverviewSection()));
        };

        _this.initializePhotoCanvas = function () {
            _this.setPhotoCanvasSize();
            photoCanvas = new PhotoCanvas(holder.photoCanvasID(), flat);
            photoCanvas.show();
        };

        _this.createSpecifications = function () {
            holder.container().append($(_this.buildInformationTable(flat.getSpecifications())));
        };

        _this.destroy = function (animate, _callback) {
            $(window).unbind(resizeEventID);
            _this.prepare(animate, _callback);
        };

        _this.fadeIn = function (_callback) {
            holder.container().css('visibility', 'visible').animo({ animation: 'fadeIn', duration: 0.5 }, function(){
                Utils.call(_callback);
            });
        };

        _this.initializeEvents = function () {
            var timer;
            var timeout = 100;

            $(window).bind(resizeEventID,(function() {
                clearTimeout(timer);
                timer = setTimeout(function(){
                    _this.setPhotoCanvasSize();
                    photoCanvas.show();
                }, timeout);
            }));
        };

        _this.pricingTableHeight = function () {
            return holder.container().find('ul.pricing-table').height();
        };

        _this.setPhotoCanvasSize = function () {
            $(holder.photoCanvasID()).css('height',_this.pricingTableHeight()+'px');
        };

        _this.buildOverviewSection = function () {
            return  '<section>'+
                        '<article>'+
                            '<h2>'+flat.address()+'</h2>'+
                            '<p>'+flat.overview().description()+'</p>'+
                        '</article>'+
                        '<div class="photo-canvas photo-canvas-big" style="margin-top:1em; background-image: url('+flat.titlePhoto().thumbnail()+');"></div>'+
                    '</section>'+
                    '<section>'+
                        '<div id="'+holder.photoCanvasID().slice(1)+'" class="photo-canvas"></div>'+
                        '<article>'+
                            _this.buildPricingTable()+
                        '</article>'+
                    '</section>';
        };


        _this.buildPricingTable = function () {
            return new FlatOverview().flat(flat)[0].outerHTML;
        };

        _this.buildTitle = function () {
            return '<h2>'+flat.address()+'</h2>';
        };

        _this.buildContainer = function () {
            return '<div id="'+ holder.containerID().slice(1)+'" class="hutby-category-description-container"></div>';
        };

        _this.buildInformationTable = function (dictionary) {
            var html = '<section><table><tbody>';
            dictionary.each(function (name, specification) {
                html += '<tr><td>' + specification.key + '</td><td>' + specification.value + '</td></tr>';
            });
            html += '</tbody></table></section>';
            return html;
        };

        _this.holder = function() {
            return holder;
        };

    }

    return FlatDescription;
});