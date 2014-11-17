/**
 * Created by aliaksei on 03/08/14.
 */
define(['jquery','hutby/lib/Utils'], function($,Utils) {

    function PagerViewHolder(prefix) {
        var _this = this;

        var photoID = '#'+prefix+'photo';
        var photoActiveID = '#'+prefix+'photo-active';
        var addressID = '#'+prefix+'address';
        var leftArrowID = '#'+prefix+'arrow-left';
        var rightArrowID = '#'+prefix+'arrow-right';
        var containerID = '#'+prefix+'container';

        var photo;
        var address;
        var leftArrow;
        var rightArrow;
        var container;

        _this.photo = function(){
            if (Utils.isUndefined(photo)) photo = Utils.$(photoID);
            return photo;
        };

        _this.photoActiveID = function(){
            return photoActiveID;
        };

        _this.photoActive = function(){
            return Utils.$(photoActiveID);
        };

        _this.address = function () {
            if (Utils.isUndefined(address)) address = Utils.$(addressID);
            return address;
        };

        _this.leftArrow = function() {
            if (Utils.isUndefined(leftArrow)) leftArrow = Utils.$(leftArrowID);
            return leftArrow;
        };

        _this.rightArrow = function(){
            if (Utils.isUndefined(rightArrow)) rightArrow = Utils.$(rightArrowID);
            return rightArrow;
        };

        _this.container = function() {
            if (Utils.isUndefined(container)) container = Utils.$(containerID);
            return container;
        }
    }

    return PagerViewHolder;
});