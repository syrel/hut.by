/**
 * Created by aliaksei on 02.01.2015.
 */

define(['jquery', 'a'], function ($, A) {

    function OffcanvasFade() {
        var _this = new A();

        _this.initialize = function () {
            _this.class('exit-off-canvas');
        };

        _this.initialize();

        return _this;
    }

    return OffcanvasFade;
});