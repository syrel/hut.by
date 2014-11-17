/**
 * Created by aliaksei on 03/08/14.
 */
define([
    'hutby/category/CategoryPreviewViewHolder',
    'hutby/lib/Utils',
    'hutby/common/Global',
    'hutby/announcements/OnFlatExpanded',
    'jquery',
    'jquery.jscrollpane',
    'jquery.animo'
],
    function (CategoryPreviewViewHolder, Utils, Global, OnFlatExpanded, $) {
    function debug(msg) {
        //console.log(msg);
    }

    function CategoryPreview(catalog, prefix) {
        var hidingTimeout = 200;
        var showingTimeout = 100;
        var fadeInSpeed = 0.1;
        var fadeOutSpeed = 0.1;

        var _this = this;

        var holder = new CategoryPreviewViewHolder(prefix);

        var hidingTimer;
        var showingTimer;

        var scrollApi;

        var currentFlats;
        var visible = false;

        /***
         * Shows flats preview list and controls logic of timeouts to make it user-friendly
         */
        _this.show = function (_flats,_anchorElement, force) {
            if (Global.isDisplaySmall()) return;

            function fadeIn() {
                if (Utils.isUndefined(showingTimer)){
                    //debug('fadein blocked');
                    //return;
                }
                debug('starting fadein');
                visible = true;
                holder.container().css('visibility','visible').animo( { animation: 'fadeIn', duration: fadeInSpeed }, function() {
                    debug('fadein finished');
                });
            }

            _this.preventFromHiding();
            _this.cancelShowing();

            force = Utils.isUndefined(force) ? false : force;

            debug('show(force='+force+')');

            /*
             Showing only after timeout when it is already shown
             */


            if (!force && _this.isVisible()) {
                if (_flats === currentFlats) return;
                _this.preventFromShowing();

                showingTimer = setTimeout(function () {
                    _this.show(_flats, _anchorElement, true)
                }, showingTimeout);
                return;
            }


            if (_flats === currentFlats) {
                fadeIn();
                return;
            }

            _this.reset();
            _this.createBox();

            _this.createLinks(_flats, function() {

                _this.setTriangleTop(_this.calculateTriangleTop(_anchorElement));

                _this.initializeScrollPane();
                currentFlats = _flats;

                fadeIn();
            });
        };

        _this.hide = function (speed, timeout, force) {
            _this.preventFromShowing();

            force = Utils.isUndefined(force) ? false : force;

            debug('hide()');

            function fadeOut () {
                debug('starting fadeout');
                if (Utils.isUndefined(holder.container())) return;
                holder.container().animo( { animation: 'fadeOut', duration: speed }, function() {
                    if (!force && Utils.isUndefined(hidingTimer)) {
                        debug('fadeout blocked');
                        return;
                    }
                    holder.container().css('visibility','hidden');
                    visible = false;
                    debug('fadeout finished');
                });
            }

            speed = Utils.isUndefined(speed) ? fadeOutSpeed : speed;
            timeout = Utils.isUndefined(timeout) ? hidingTimeout : timeout;

            debug('setting hiding timer');
            hidingTimer = setTimeout(function () {
                fadeOut();
            }, timeout);
        };

        _this.reset = function() {
            if (!Utils.isUndefined(scrollApi)) {
                scrollApi.destroy();
                scrollApi = null;
            }

            if(_this.isBoxCreated()){
                _this.removeLinks();
                holder.container().remove();
                holder = new CategoryPreviewViewHolder(prefix);
            }
        };

        _this.removeLinks = function() {
            holder.scrollPane().empty();
        };

        _this.createBox = function() {
            Global.pageContent.append($(_this.buildBox()).css('visibility','hidden'));

            holder.container().hover(function () {
                _this.preventFromHiding();
                _this.preventFromShowing();
            }, function () {
                _this.hide();
            });
        };

        _this.createLinks = function(_flats, _callback) {
            $.each(_flats, function(index, flat){
                holder.scrollPane().append($(_this.buildLink(index,flat)).click(function(e){
                    e.preventDefault();
                    catalog.announcer().announce(new OnFlatExpanded(flat));
                }));
            });

            Utils.attachOnLoadListener($(holder.scrollPaneID()+' img'), _callback);
        };

        _this.initializeScrollPane = function(){
            var scrollBarWidth = parseInt(Utils.getCssValue('body', 'jspVerticalBar', 'width'));
            var paddingRight = _this.getBoxPaddingRight();
            var thinPaddingRight = Math.floor((paddingRight - scrollBarWidth) / 2);

            var settings = { hideFocus: true, verticalGutter: thinPaddingRight };

            if (Utils.isUndefined(scrollApi)) {
                holder.scrollPane().css('overflow-y', 'auto');
                scrollApi = holder.scrollPane().jScrollPane(settings).data('jsp');
            }

            holder.container().css('padding-right', (scrollApi.getIsScrollableV() ? thinPaddingRight : paddingRight) + 'px');
            scrollApi.reinitialise(settings);
        };

        _this.calculatePreviewMaxHeight = function() {
            var topY = _this.getBoxTop();
            var screenHeight = $(window).height();
            return (screenHeight - topY) * 0.8;
        };

        _this.preventFromHiding = function () {
            clearTimeout(hidingTimer);
            hidingTimer = null;
        };

        _this.preventFromShowing = function () {
            _this.cancelShowing();
            showingTimer = null;
        };

        _this.cancelShowing = function(){
            clearTimeout(showingTimer);
        };

        _this.isBoxCreated = function() {
            return !Utils.isUndefined(holder.container());
        };

        _this.isVisible = function () {
            return visible;
        };

        _this.calculateTriangleTop = function(_anchorElement) {
            var topY = _this.getBoxTop();
            var paddingTop = _this.getBoxPaddingTop();
            var elementTop = _anchorElement.position().top;
            var elementHeight = _anchorElement.height();

            return (paddingTop + elementTop - topY + elementHeight / 2);
        };

        _this.getBoxTop = function(){
            return parseInt(Utils.getCssValue(Global.pageContentID, prefix+'container', 'top'));
        };

        _this.getBoxPaddingTop = function(){
            return parseInt(Utils.getCssValue(Global.pageContentID, prefix+'container', 'padding-top'));
        };

        _this.getBoxPaddingRight = function(){
            return parseInt(Utils.getCssValue(Global.pageContentID, prefix+'container', 'padding-right'));
        };

        _this.setTriangleTop = function (top) {
            Utils.dynamicCss().text("." + prefix + "container:after{top:" + top + "px;}");
        };

        _this.buildBox = function() {
            return '<div id="'+holder.containerID().slice(1)+'" class="hutby-flat-category-preview-box-container">' +
                '<div id="'+holder.scrollPaneID().slice(1)+'" class="hutby-flat-category-preview-box-scrollpane"></div>' +
                '</div>';
        };

        _this.buildLink = function(_index, _flat) {
            return '<a class="hutby-flat-category-preview-box-link">' +
                '<img src="'+_flat.getPhoto(0)+'">'+
                '<div class="hutby-flat-category-preview-box-link-info-container">'+
                '<div class="hutby-flat-category-preview-box-link-info-cost">'+_flat.getCost()+'</div>'+
                '<div class="text-center hutby-flat-category-preview-box-link-info-address">'+_flat.getAddress()+'</div>'+
                '</div>'+
                '</a>';
        };


        _this.hoverAction = function(_rooms, _anchor) {
            if (!Global.isPageContentVisible()) return;
            _this.preventFromHiding();
            _this.show(catalog.flats(_rooms), _anchor);
        };

        _this.unhoverAction = function(_rooms, _anchor) {
            _this.hide();
        };
    }

    return CategoryPreview;
});