/**
 * Created by aliaksei on 01.01.2015.
 */

define(['jquery'], function ($) {

    function PagerAddress (_flat) {
        var _this = $('<a class="hutby-flat-pager-short-info-address" href="#"></a>');

        var flat = _flat;

        _this.initialize = function () {
            _this.updateLink();
            _this.click(function(e) {
                e.preventDefault();
                _this.getFlat().expand(false, true);
            });
        };

        _this.getFlat = function () {
            return flat;
        };

        _this.setFlat = function(_flat) {
            flat = _flat;
            _this.updateLink();
        };

        _this.updateLink = function () {
            _this.text(_this.getFlat().getAddress());
        };

        return _this;
    }
    return PagerAddress;

});