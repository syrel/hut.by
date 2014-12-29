/**
 * Created by aliaksei on 03/08/14.
 */
define([
        'hutby/main/PagerViewHolder',
        'hutby/lib/Utils',
        'hutby/lib/WindowEvents',
        'hutby/announcements/OnFlatExpanded',
        'hutby/announcements/OnCategoryExpanded',
        'hutby/announcements/OnCategoryCollapsed',
        'hutby/common/Global',
        'jquery',
        'jquery.animo'
],
    function(PagerViewHolder, Utils, WindowEvents,OnFlatExpanded, OnCategoryExpanded, OnCategoryCollapsed, Global, $){

    function Pager (catalog, prefix) {
        var _this = this;

        var pagerHideEffect = 'zoomOutLeft';
        var pagerShowEffect = 'zoomInLeft';
        var pagerSwapEffect = 'fadeIn';

        var pagerHideSpeed = 0.75;
        var pagerShowSpeed = 0.75;

        var timeout = 5000;
        var defaultSpeed = 0.5;

        var holder = new PagerViewHolder(prefix);

        var currentIndex = 0;
        var currentSpeed;

        var flats = catalog.allFlats();
        var timer;
        var isWasVisible; //initialize later
        var block = false;

        _this.initialize = function () {
            catalog.announcer().onSendTo(OnCategoryExpanded, _this.onCategoryExpanded, _this);
            catalog.announcer().onSendTo(OnCategoryCollapsed, _this.onCategoryCollapsed, _this);
        };

        _this.onCategoryExpanded = function () {
            _this.hide();
        };

        _this.onCategoryCollapsed = function () {
            _this.show();
        };

        _this.setFlats = function (_flats) {
            flats = _flats;
        };

        _this.setSpeed = function(_speed) {
            currentSpeed = _speed;
        };

        _this.swap = function() {

            function loop() {
                if (!_this.isVisible()) return;
                _this.setSpeed(defaultSpeed);

                _this.nextFlat(function() {
                    timer = setTimeout(loop, timeout);
                });
            }

            _this.stopSwapping();
            timer = setTimeout(loop, timeout);
        };

        _this.swapImage = function(_imagePath, _callback) {

            holder.photo().after(_this.buildNextPhoto(_imagePath));
            var newPhoto = holder.photoActive();

            $(holder.photoActiveID()).show(0).animo({ animation: pagerSwapEffect, duration: currentSpeed }, function() {
                holder.photo().css('background-image', 'url('+_imagePath+')');
                newPhoto.remove();
                _callback()
            });
        };

        _this.swapFlatTo = function(_index, _callback) {
            if (block) return;
            block = true;

            if (_index >= flats.length) _index = 0;
            if (_index < 0) _index = flats.length - 1;

            Utils.imagePreload(flats[_index].getPhoto(0), function() {

                _this.swapImage(flats[_index].getPhoto(0), function() {
                    holder.address().html(flats[_index].getAddress());
                    currentIndex = _index;
                    block = false;
                    _callback();
                });
            });
        };

        _this.hide = function (_callback) {
            if (!_this.isVisible()) {
                Utils.call(_callback);
                return;
            }

            _this.stopSwapping();

            var duration = Global.isDisplaySmall() ? 0 : pagerHideSpeed;

            holder.container().animo( { animation: pagerHideEffect, duration: duration }, function() {
                holder.container().hide(0);
                _this.updateVisibility();
                Utils.call(_callback);
            });
        };

        _this.show = function () {
            if (Global.isDisplaySmall()) return;

            _this.createPager();

            if (_this.isVisible()) {
                _this.swap();
                return;
            }

            holder.container().show(0).animo({ animation: pagerShowEffect, duration: pagerShowSpeed }, function(){
                _this.updateVisibility();
                _this.swap();
            });
        };

        _this.nextFlat = function (_callback) {
            _this.swapFlatTo(currentIndex + 1, _callback);
        };

        _this.previousFlat = function (_callback) {
            _this.swapFlatTo(currentIndex - 1, _callback);
        };

        _this.stopSwapping = function(){
            clearTimeout(timer);
        };

        _this.leftArrowClick = function () {
            _this.stopSwapping();
            _this.setSpeed(0);
            _this.previousFlat(function(){
                _this.swap();
            })
        };

        _this.rightArrowClick = function(){
            _this.stopSwapping();
            _this.setSpeed(0);
            _this.nextFlat(function(){
                _this.swap();
            })
        };

        _this.windowOnResize = function(){
            var isVisible = _this.isVisible();
            if (isWasVisible != isVisible) {
                if (isVisible) _this.swap();
                else _this.stopSwapping();
                isWasVisible = isVisible;
            }
        };

        _this.isVisible = function() {
            if (Utils.isUndefined(holder.container())) return false;
            return holder.container().is(':visible');
        };

        _this.updateVisibility = function () {
            isWasVisible = _this.isVisible();
        };

        _this.buildNextPhoto = function(imagePath) {
            return '<div id="'+holder.photoActiveID().slice(1)+'" class="hutby-flat-pager-photo active" style="background-image: url('+imagePath+'); display: none;">&nbsp;</div>';
        };

        _this.initializeEvents = function () {
            _this.updateVisibility();
            holder.leftArrow().click(_this.leftArrowClick);
            holder.rightArrow().click(_this.rightArrowClick);
            WindowEvents.addOnResizeEvent(_this.windowOnResize);

            holder.address().html(flats[currentIndex].getAddress());
            holder.address().click(function(e){
                e.preventDefault();
                catalog.announcer().announce(new OnFlatExpanded(flats[currentIndex]));
            });

            _this.swap();
        };

        _this.createPager = function () {
            if (Utils.isUndefined(holder.container())) {
                Global.pageContent.append($(_this.buildPager(catalog.allFlats()[currentIndex])));
                _this.initializeEvents();
            }
        };

        _this.buildPager = function(flat) {
            return '<div id="hutby-flat-pager-container" class="hutby-flat-pager-container">'+
                        '<div id="hutby-flat-pager-photo" class="hutby-flat-pager-photo" style="background-image: url('+flat.getPhoto(0)+');">&nbsp;</div>'+

                        '<div class="hutby-flat-pager-short-info-container">'+
                            '<a class="hutby-flat-pager-short-info-phone" href="tel:+375293990099"></a>'+
                            '<a id="hutby-flat-pager-address" class="hutby-flat-pager-short-info-address" href="#" class="">'+flat.getAddress()+'</a>'+
                        '</div>'+

                        '<div class="text-center hutby-flat-pager-slogan-container">'+
                            '<p>в Минске</p>'+
                            '<p>в центре</p>'+
                            '<p>у метро</p>'+
                        '</div>'+

                        '<a id="hutby-flat-pager-arrow-left" class="hutby-flat-pager-arrow-left"></a>'+
                        '<a id="hutby-flat-pager-arrow-right" class="hutby-flat-pager-arrow-right"></a>'+
                    '</div>';
        };

        /////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////// I N I T ////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////
        _this.initialize();
    }

    return Pager;
});