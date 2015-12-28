/**
 * Created by aliaksei on 27/12/15.
 */

define([
    'div',
    'h3',
    'ul',
    'a',
    'input',
    'label',
    'li',
    'i'
], function(
    Div,
    H3,
    Ul,
    A,
    Input,
    Label,
    Li,
    I
    ){

    function TextField () {
        var _this = new Div().class('mdl-textfield').class('mdl-js-textfield');

        var id = Math.random().toString(36).substr(2, 5);
        var input = new Input().class('mdl-textfield__input').type('text').id(id);
        var label = new Label().class('mdl-textfield__label').for(id);

        _this.initialize = function() {
            _this.add(input).add(label);
        };

        _this.id = function (_id) {
            id = _id;
            input.id(id);
            label.for(id);
        };

        _this.value = function(aString) {
            if(_.isUndefined(aString)) return input.val();
            if (_this.value() == aString) return _this;
            input.val(aString);
            return _this;
        };

        _this.hint = function(aString){
            label.text(aString);
            return _this;
        };

        _this.bind = function (aValueHolder) {
            if (_.isUndefined(aValueHolder)) return;

            var binding = _this.value;
            // First we subscribe
            aValueHolder.subscribe(binding);
            // Then as soon as element is removed - unsubscribe
            _this.on('remove', function () {
                aValueHolder.unsubscribe(binding);
            });

            // synchronize on keyup
            input.keyup(function(){
               aValueHolder.value(_this.value());
            });
            _this.value(aValueHolder.value());
        };

        _this.focus = function() {
            input.focus();
            return _this;
        };

        _this.initialize();

        return _this;
    }

    function MaterialFlatParametersCard() {
        var _this = new Div().class('demo-options').class('mdl-card').class('mdl-shadow--2dp').class('mdl-cell').class('mdl-cell--4-col');

        var accentColor = 'mdl-color-text--grey-800';
        var wrapper = new Div().class('mdl-card__supporting-text');
        var title = new H3();
        var list = new Ul();

        var actionWrapper = new Div().class('mdl-card__actions').class('mdl-card--border');
        var actionButton = new A();


        _this.initialize = function () {
            _this.add(wrapper);
            wrapper.add(title);
            wrapper.add(list);
        };

        _this.accentColor = function(color) {
            if(_.isUndefined(color)) return accentColor;
            _this.resetAccentColor();

            accentColor = color;

            _this.applyAccentColor();
            return _this;
        };

        _this.resetAccentColor = function () {
            title.removeClass(_this.accentColor());
            actionButton.removeClass(_this.accentColor());
        };

        _this.applyAccentColor = function () {
            title.class(_this.accentColor());
            actionButton.class(_this.accentColor());
        };

        _this.title = function (aString) {
            if(_.isUndefined(aString)) return title.text();
            title.text(aString);
            return _this;
        };

        _this.addAction = function (label, callback) {
            actionWrapper.remove();
            actionWrapper.empty();
            actionButton = _this.buildActionButton(label);
            actionButton.click(function(e){
                e.preventDefault();
                callback();
            });
            actionButton.class(_this.accentColor());
            actionWrapper.add(actionButton);
            _this.add(actionWrapper);
        };

        _this.textField = function (optBinding) {
            var element = new Li();
            var textField = new TextField();
            textField.bind(optBinding);
            element.add(textField);
            _this.addParameter(element);
            return textField;
        };

        _this.addParameter = function (element) {
            list.add(element);
            _this.initializeSortable();
        };

        _this.initializeSortable = function() {

        };

        _this.buildActionButton = function (label) {
            return new A().class('mdl-button').class('mdl-js-button').class('mdl-js-ripple-effect').text(label);
        };

        _this.initialize();

        return _this;
    }

    return MaterialFlatParametersCard;

});