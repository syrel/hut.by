
define([
    'hutby/common/Flat',
    'hutby/common/Catalog',
    'hutby/ui/editor/MaterialFlatListRenderer',
    'hutby/ui/editor/MaterialFlatPhotoListRenderer',
    'hutby/ui/editor/MaterialFlatFeaturesListRenderer',
    'hutby/ui/editor/MaterialFlatSpecsListRenderer',
    'hutby/ui/editor/MaterialFlatInfoRenderer',
    'underscore',
    'jquery',
    'jquery.me',
    'material'
], function(
    Flat,
    Catalog,
    MaterialFlatListRenderer,
    MaterialFlatPhotoListRenderer,
    MaterialFlatFeaturesListRenderer,
    MaterialFlatSpecsListRenderer,
    MaterialFlatInfoRenderer) {

    var init = function(flats) {
        var catalog = new Catalog();

        _.each(flats, function(flat){
            catalog.addFlat(new Flat(flat));
        });

        var listRenderer = new MaterialFlatListRenderer();
        listRenderer.visit(catalog);
        $('.demo-drawer').append(listRenderer.html());

        var photoRenderer = new MaterialFlatPhotoListRenderer();
        photoRenderer.visit(catalog.allFlats()[0]);
        $('.demo-content').append(photoRenderer.html());

        var infoRenderer = new MaterialFlatInfoRenderer();
        infoRenderer.visit(catalog.allFlats()[0]);
        $('.demo-cards').append(infoRenderer.html());

        var featureRenderer = new MaterialFlatFeaturesListRenderer();
        featureRenderer.visit(catalog.allFlats()[0]);
        $('.demo-cards').append(featureRenderer.html());

        var specRenderer = new MaterialFlatSpecsListRenderer();
        specRenderer.visit(catalog.allFlats()[0]);
        $('.demo-cards').append(specRenderer.html());

        componentHandler.upgradeDom();

    };

    $.getScript( "js/config.js", function(){init(_config)}).error(function() {
        require(['config'], function(){init(_config)});
    });
});