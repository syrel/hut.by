/**
 * Created by aliaksei on 28/12/15.
 */
define([
    'hutby/announcements/OnFlatExpanded',
    'hutby/announcements/OnFlatCollapsed',
    'header',
    'div',
    'span'
], function(
    OnFlatExpanded,
    OnFlatCollapsed,
    Header,
    Div,
    Span
    ){

    function MaterialHeader(catalog){
        var _this = new Div().class('mdl-layout__header-row');

        var title;

        _this.initialize = function(){

        };

        _this.initializeFor = function(flat) {
            if (_.isNull(flat)) return;
            var binding = title.bindText(flat.addressHolder());
            flat.announcer().onSendTo(OnFlatCollapsed, function(){
                flat.addressHolder().unsubscribe(binding);
            }, this);
            componentHandler.upgradeDom();
        };

        _this.buildTitle = function() {
            return new Span().class('mdl-layout-title').text(_this.unsignedTitle());
        };

        _this.buildDropDown = function() {
            return $(
                '<button class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" id="hdrbtn">'+
                    '<i class="material-icons">more_vert</i>'+
                '</button>'+
                '<ul class="mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-right" for="hdrbtn">'+
                    '<li class="mdl-menu__item">Сохранить</li>'+
                    '<li class="mdl-menu__item">Сохранить как</li>'+
                    '<li class="mdl-menu__item">Загрузить</li>'+
                '</ul>');
        };

        _this.buildSpacer = function(){
            return new Div().class('mdl-layout-spacer');
        };

        _this.onFlatExpanded = function(ann) {
            _this.initializeFor(ann.flat());
        };

        _this.onFlatCollapsed = function() {
            title.text('');
        };

        _this.addTitle = function(){
            title = _this.buildTitle();
            _this.add(title);
        };

        _this.show = function() {
            _this.hide();
            catalog.announcer().onSendTo(OnFlatExpanded, _this.onFlatExpanded, _this);
            catalog.announcer().onSendTo(OnFlatCollapsed, _this.onFlatCollapsed, _this);
            _this.add(_this.buildSpacer());
            _this.add(_this.buildDropDown());
            _this.initializeFor(catalog.expandedFlat());
        };

        _this.hide = function(){
            catalog.announcer().unsubscribe(_this);
            _this.empty();
            _this.addTitle();
        };

        _this.unsignedTitle = function(){
            return 'Пожалуйста, войдите';
        };

        //_this.initialize();

        return _this;
    }

    return MaterialHeader;

});