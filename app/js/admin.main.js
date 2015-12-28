
define([
    'hutby/common/Flat',
    'hutby/common/Catalog',
    'hutby/ui/editor/MaterialFlatList',
    'hutby/ui/editor/MaterialFlatEditor',
    'hutby/ui/editor/MaterialFlatListRenderer',
    'hutby/ui/editor/MaterialFlatPhotoListRenderer',
    'hutby/ui/editor/MaterialFlatFeaturesListRenderer',
    'hutby/ui/editor/MaterialFlatSpecsListRenderer',
    'hutby/ui/editor/MaterialFlatInfoRenderer',
    'hutby/ui/editor/MaterialFlatParametersCard',
    'underscore',
    'jquery',
    'jquery.me',
    'material'
], function(
    Flat,
    Catalog,
    MaterialFlatList,
    MaterialFlatEditor) {

    var init = function(flats) {
        var catalog = new Catalog();

        _.each(flats, function(flat){
            catalog.addFlat(new Flat(flat));
        });

        var flatList = new MaterialFlatList(catalog);
        $('.demo-drawer').append(flatList);

        var flatEditor = new MaterialFlatEditor(catalog);
        $('main.mdl-layout__content').append(flatEditor);

        catalog.allFlats()[0].expand();

        componentHandler.upgradeDom();
    };

    $.getScript( "js/config.js", function(){init(_config)}).error(function() {
        require(['config'], function(){init(_config)});
    });
});