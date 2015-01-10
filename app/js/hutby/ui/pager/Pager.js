/**
 * Created by aliaksei on 03/08/14.
 */

"use strict";
define([
    'a',
    'div',
    'p',
    'hutby/lib/Utils',
    'hutby/lib/WindowEvents',
    'hutby/announcements/OnFlatExpanded',
    'hutby/announcements/OnCategoryExpanded',
    'hutby/announcements/OnCategoryCollapsed',
    'hutby/common/Global',
    'hutby/ui/pager/PagerLeftArrow',
    'hutby/ui/pager/PagerRightArrow',
    'hutby/ui/pager/PagerPhoto',
    'hutby/ui/pager/PagerAddress',
    'jquery',
    'jquery.animo'
], function(
    A,
    Div,
    P,
    Utils,
    WindowEvents,
    OnFlatExpanded,
    OnCategoryExpanded,
    OnCategoryCollapsed,
    Global,
    PagerLeftArrow,
    PagerRightArrow,
    PagerPhoto,
    PagerAddress,
    $){

    function ShortInfo () {
        return $('<div class="hutby-flat-pager-short-info-container"><a class="hutby-flat-pager-short-info-phone" href="tel:+375293990099"></a></div>');
    }

    function Slogan () {
        return $('<div class="text-center hutby-flat-pager-slogan-container">'+
                    '<p>в Минске</p>'+
                    '<p>в центре</p>'+
                    '<p>у метро</p>'+
                '</div>');
    }

    /**
     * Defines pager opening animation
     * @param animated - true to show animation,
     *                 - false otherwise
     * @constructor
     */
    function OpenAnimation(animated) {
        this.animation = 'zoomInLeft';
        this.duration = animated ? 0.75 : 0;
    }

    /**
     * Defines pager hiding animation
     * @constructor
     */
    function HideAnimation() {
        this.animation = 'zoomOutLeft';
        this.duration = 0.75;
    }

    function Pager (catalog) {
        var _this = new Div();

        var pagerSwapEffect = 'fadeIn';

        var timeout = 5000;
        var defaultSpeed = 0.5;

        var currentIndex = 0;
        var currentSpeed;

        var leftArrow = new PagerLeftArrow();
        var rightArrow = new PagerRightArrow();
        var photo = new PagerPhoto();
        var address = new PagerAddress();

        var flats = catalog.allFlats();
        var timer;
        var isWasVisible; //initialize later
        var block = false;

        _this.initialize = function () {
            _this.class('hutby-flat-pager-container');

            catalog.announcer().onSendTo(OnCategoryExpanded, _this.onCategoryExpanded, _this);
            catalog.announcer().onSendTo(OnCategoryCollapsed, _this.onCategoryCollapsed, _this);
            photo.setPhoto(_this.currentFlat().getPhoto(0));
            address.setFlat(_this.currentFlat());

            if (!catalog.isCategoryExpanded()) _this.showPager(false);
        };

        /**
         * An action to be executed when a category
         * is expanded. In our case we are hiding pager
         */
        _this.onCategoryExpanded = function () {
            _this.hidePager(true);
        };

        /**
         * An action to be executed when a category
         * is collapsed. In our case we are trying
         * to show pager
         */
        _this.onCategoryCollapsed = function () {
            _this.showPager(true);
        };

        /**
         * Sets swap animation speed
         * @param _speed
         */
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

            var newPhoto = _this.buildNextPhoto(_imagePath);
            photo.after(newPhoto);
            newPhoto.animo({ animation: pagerSwapEffect, duration: currentSpeed }, function() {
                photo.setPhoto(_imagePath);
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
                    currentIndex = _index;
                    address.setFlat(_this.currentFlat());
                    block = false;
                    _callback();
                });
            });
        };

        /**
         *
         */
        _this.hidePager = function () {
            _this
                .stopSwapping()
                .animoStop()
                .animo( new HideAnimation(), function() {
                    _this.hide(0);
                    _this.updateVisibility();
            });
        };

        /**
         * Shows pager with animation or without, specified
         * by passed parameter. Shows pager if and only if
         * webpage is not in mobile mode.
         * @param animated - true to use opening animation,
         *                 - otherwise false
         */
        _this.showPager = function (animated) {
            if (!Global.isDisplayMedium()) return;
            _this
                .createPager()
                .animoStop()
                .show(0).animo(new OpenAnimation(animated), function(){
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

        _this.currentFlat = function () {
            return flats[currentIndex];
        };

        _this.stopSwapping = function(){
            clearTimeout(timer);
            return _this;
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
            return _this.is(':visible');
        };

        _this.updateVisibility = function () {
            isWasVisible = _this.isVisible();
        };

        _this.buildNextPhoto = function(imagePath) {
            var nextPhoto = new PagerPhoto();
            nextPhoto.beActive();
            nextPhoto.setPhoto(imagePath);
            return nextPhoto;
        };

        _this.initializeEvents = function () {
            _this.updateVisibility();
            leftArrow.click(_this.leftArrowClick);
            rightArrow.click(_this.rightArrowClick);
            WindowEvents.addOnResizeEvent(_this.windowOnResize);

            _this.swap();
        };

        _this.createPager = function () {
            if (!_this.isInDom()) {
                _this.append(photo);
                var shortInfo = new ShortInfo();
                shortInfo.append(address);
                _this.append(shortInfo);
                _this.append(new Slogan());
                _this.append(leftArrow);
                _this.append(rightArrow);
                _this.initializeEvents();
                Global.pageContent.append(_this);
            }
            return _this;
        };

        /////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////// I N I T ////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////
        _this.initialize();
        return _this;
    }

    return Pager;
});