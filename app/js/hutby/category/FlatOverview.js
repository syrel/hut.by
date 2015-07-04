define([
    'hutby/common/Global',
    'ul',
    'li',
    'a'
],function(
    Global,
    Ul,
    Li,
    A
    ){

    /**
     *
     * @returns {*}
     * @constructor
     * @class FlatOverview
     */
    function FlatOverview() {
        var _this = new Ul().class('pricing-table');

        var flat;

        /**
         * @param _flat
         * @returns {Flat}
         */
        _this.flat = function (_flat) {
            if (_.isUndefined(_flat)) return flat;
            flat = _flat;
            _this.render();
            return _this;
        };

        _this.render = function () {
            _this.empty();
            _this.renderAmount();
            _this.renderSpecial();
            _this.renderFeatures();
            _this.renderPhone();
        };

        _this.renderAmount = function () {
            if (_.isUndefined(_this.flat().price().amount())) return;
            var amount = _this.newAmount().text(_this.flat().price().printString());
            _this.add(amount);
        };

        _this.renderSpecial = function () {
            if (_.isUndefined(_this.flat().price().special())) return;
            var special = _this.newSpecial().text(_this.flat().price().special());
            _this.add(special);
        };

        _this.renderFeatures = function () {
            _.each(_.union([_this.flat().printTitle()],_this.flat().overview().features()), function(each){
                _this.add(_this.newFeature().text(each));
            });
        };

        _this.renderPhone = function () {
            var phone = _this.newPhone();
            var link = new A().href(Global.phone.replace(/\s+/g, '')).text(Global.phone);
            phone.add(link);
            _this.add(phone);
        };

        _this.newAmount = function () {
            return new Li().class('price');
        };

        _this.newSpecial = function () {
            return new Li().class('description');
        };

        _this.newFeature = function () {
            return new Li().class('bullet-item');
        };

        _this.newPhone = function () {
            return new Li().class('cta-button');
        };

        return _this;
    }

    return FlatOverview;

});