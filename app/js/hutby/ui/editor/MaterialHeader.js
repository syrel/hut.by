/**
 * Created by aliaksei on 28/12/15.
 */
define([
    'hutby/announcements/OnFlatExpanded',
    'hutby/announcements/OnFlatCollapsed',
    'header',
    'div',
    'span',
    'ul',
    'li',
    'button',
    'i'
], function(
    OnFlatExpanded,
    OnFlatCollapsed,
    Header,
    Div,
    Span,
    Ul,
    Li,
    Button,
    I
    ){

    function FlatActions () {
        var _this = new Ul().class('mdl-menu').class('mdl-js-menu').class('mdl-js-ripple-effect').class('mdl-menu--bottom-right');

        _this.action = function (label, callback) {
            var action = _this.buildAction();
            action.text(label).click(callback);
            _this.add(action);
        };

        _this.buildAction = function () {
            return new Li().class('mdl-menu__item');
        };

        return _this;
    }

    function MaterialHeader(catalog){
        var _this = new Div().class('mdl-layout__header-row');

        var title;
        var actionsButton;
        var actionsList;

        _this.initialize = function(){

        };

        _this.initializeFor = function(flat) {
            if (_.isNull(flat)) return;
            var binding = title.bindText(flat.addressHolder());
            flat.announcer().onSendTo(OnFlatCollapsed, function(){
                flat.addressHolder().unsubscribe(binding);
            }, this);
            _this.initializeActionsFor(flat);
            componentHandler.upgradeDom();
        };

        _this.initializeActionsFor = function(flat) {
            actionsButton.hidden(false);
            actionsList.action('Удалить', function(){
                flat.remove();
            });
        };

        _this.buildTitle = function() {
            return new Span().class('mdl-layout-title').text(_this.unsignedTitle());
        };

        _this.addActions = function () {
            actionsButton = _this.buildActionsButton();
            actionsButton.hidden(true);
            actionsList = _this.buildActionsList();
            actionsButton.id('flat-actions');
            actionsList.for('flat-actions');
            _this.add(actionsButton).add(actionsList);
        };

        _this.buildActionsButton = function() {
            var button = new Button().class('mdl-button').class('mdl-js-button').class('mdl-js-ripple-effect').class('mdl-button--icon');
            button.add(new I().class('material-icons').text('more_vert'));
            return button;
        };

        _this.buildActionsList = function () {
            return new FlatActions();
        };

        _this.buildSpacer = function(){
            return new Div().class('mdl-layout-spacer');
        };

        _this.onFlatExpanded = function(ann) {
            _this.initializeFor(ann.flat());
        };

        _this.onFlatCollapsed = function() {
            title.text('');
            actionsButton.hidden(true);
            actionsList.empty();
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
            _this.addActions();
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

        _this.initialize();

        return _this;
    }

    return MaterialHeader;

});