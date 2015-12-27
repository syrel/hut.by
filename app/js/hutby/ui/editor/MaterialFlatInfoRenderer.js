/**
 * Created by aliaksei on 27/12/15.
 */
define([
    'hutby/common/CatalogVisitor'
], function(
    CatalogVisitor
    ){

    function MaterialFlatInfoRenderer(){
        var _this = new CatalogVisitor();

        var html = $('<div class="demo-options mdl-card mdl-shadow--2dp mdl-cell mdl-cell--4-col"></div>');
        var table = $('<div class="mdl-card__supporting-text"></div>');
        var header = $('<h3 class="mdl-color-text--pink-400">Базовые характеристики</h3>');
        var list = $('<ul></ul>');

        html.append(table);
        table.append(header);
        table.append(list);


        _this.html = function(){
            return html;
        };


        /**
         *
         * @param flat {Flat}
         */
        _this.visitFlat = function(flat) {
            list.append(_this.createEditField(flat.address(), "адрес..."));
        };

        /**
         * @param price {Price}
         */
        _this.visitPrice = function(price) {
            list.append(_this.createEditField(price.amount(), "цена..."));
            list.append(_this.createEditField(price.currency(), "валюта..."));
            list.append(_this.createEditField(price.special(), "скидки..."));
        };

        _this.createEditField = function(text, label) {
            var li = $('<li></li>');
            var form = $('<form action="#"></form>');
            var wrapper = $('<div class="mdl-textfield mdl-js-textfield"></div>');
            var input = $('<input class="mdl-textfield__input" type="text" id="sample1">');
            var label = $('<label class="mdl-textfield__label" for="sample1">'+label+'</label>');

            input.val(text);

            li.append(form);
            form.append(wrapper);
            wrapper.append(input);
            wrapper.append(label);
            return li;
        };



        return _this;
    }
    return MaterialFlatInfoRenderer;
});