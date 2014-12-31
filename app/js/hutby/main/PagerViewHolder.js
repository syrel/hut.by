/**
 * Created by aliaksei on 03/08/14.
 */
define(['jquery','hutby/lib/Utils'], function($,Utils) {

    function PagerViewHolder(prefix) {
        var _this = this;

        var addressID = '#'+prefix+'address';
        var address;

        _this.address = function () {
            if (Utils.isUndefined(address)) address = Utils.$(addressID);
            return address;
        };
    }

    return PagerViewHolder;
});