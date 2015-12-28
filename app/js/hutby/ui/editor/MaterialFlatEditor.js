/**
 * Created by aliaksei on 27/12/15.
 */

define([
    'div',
    'hutby/ui/editor/MaterialFlatParametersCard',
    'hutby/announcements/OnFlatExpanded',
    'hutby/announcements/OnFlatCollapsed'
], function(
    Div,
    MaterialFlatParametersCard,
    OnFlatExpanded,
    OnFlatCollapsed
){

    function MaterialFlatEditor(catalog) {
        var _this = new Div().class('mdl-grid').class('demo-content');

        _this.initialize = function () {};

        _this.onFlatExpanded = function (ann) {
            _this.initializeFor(ann.flat());
        };

        _this.onFlatCollapsed = function () {
            _this.empty();
        };

        _this.initializeFor = function (flat) {
            if (_.isNull(flat)) return;
            var paramCards = _this.buildParametersContainer();
            _this.add(paramCards);
            paramCards.add(_this.buildBasicInfoFor(flat));
            paramCards.add(_this.buildFeaturesFor(flat));
            paramCards.add(_this.buildSpecsFor(flat));
            componentHandler.upgradeDom();
        };

        _this.buildParametersContainer = function () {
            return new Div().class('demo-cards').class('mdl-cell').class('mdl-cell--12-col').class('mdl-grid');
        };

        _this.buildBasicInfoFor = function (flat) {
            var card = new MaterialFlatParametersCard();
            card.title('Базовые характеристики');
            card.accentColor('mdl-color-text--pink-400');
            card.textField(flat.addressHolder()).hint('Адрес...');
            card.textField(flat.price().amountHolder()).hint('Цена...');
            card.textField(flat.price().currencyHolder()).hint('Валюта...');
            card.textField(flat.price().specialHolder()).hint('Скидки...');
            return card;
        };

        _this.buildFeaturesFor = function(flat) {
            var card = new MaterialFlatParametersCard();
            card.title('Особенности');
            card.accentColor('mdl-color-text--cyan-500');
            _.each(flat.overview().featureHolders(), function(feature){
                card.textField(feature).hint('Текст...');
            });
            return card;
        };

        _this.buildSpecsFor = function(flat) {
            var card = new MaterialFlatParametersCard();
            card.title('Комплектация и инфраструктура');
            card.accentColor('mdl-color-text--purple-500');
            _.each(flat.overview().specHolders(), function(spec){
                card.textField(spec).hint('Текст...');
            });
            return card;
        };

        _this.show = function() {
            _this.hide();
            catalog.announcer().onSendTo(OnFlatExpanded, _this.onFlatExpanded, _this);
            catalog.announcer().onSendTo(OnFlatCollapsed, _this.onFlatCollapsed, _this);
            _this.initializeFor(catalog.expandedFlat());
        };

        _this.hide = function() {
            catalog.announcer().unsubscribe(_this);
            _this.empty();
        };


        _this.initialize();

        return _this;
    }

    return MaterialFlatEditor;

});