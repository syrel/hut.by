/**
 * Created by aliaksei on 27/12/15.
 */
define([
    'hutby/common/CatalogVisitor'
], function(
    CatalogVisitor
    ){

    function MaterialFlatFeaturesListRenderer(){
        var _this = new CatalogVisitor();

        var html = $('<div class="demo-options mdl-card mdl-shadow--2dp mdl-cell mdl-cell--4-col"></div>');
        var table = $('<div class="mdl-card__supporting-text"></div>');
        var header = $('<h3 class="mdl-color-text--cyan-500">Особенности</h3>');
        var list = $('<ul></ul>');

        html.append(table);
        table.append(header);
        table.append(list);


        _this.html = function(){
            return html;
        };

        /**
         * @param overview {Overview}
         */
        _this.visitOverview = function(overview) {
            _.each(overview.features(), function(feature){
                var li = $('<li></li>');
                var form = $('<form action="#"></form>');
                var wrapper = $('<div class="mdl-textfield mdl-js-textfield"></div>');
                var input = $('<input class="mdl-textfield__input" type="text" id="sample1">');
                var label = $('<label class="mdl-textfield__label" for="sample1">Текст...</label>');

                input.val(feature);

                li.append(form);
                form.append(wrapper);
                wrapper.append(input);
                wrapper.append(label);

                list.append(li);
            });


            var add = $(
                '<div class="mdl-card__actions mdl-card--border">'+
                    '<a href="#" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--cyan-500">Добавить</a>'+
                '</div>');
            html.append(add);

        };

        return _this;
    }
    return MaterialFlatFeaturesListRenderer;
});