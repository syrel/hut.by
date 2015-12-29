/**
 * Created by aliaksei on 02/08/14.
 */

define([
    'hutby/ui/offcanvas/Offcanvas',
    'hutby/common/Navigation',
    'hutby/common/Flat',
    'hutby/common/Catalog',
    'hutby/ui/PhotoSwipe',
	'underscore',
    'jquery',
	'jquery.me',
    'foundation',
    'foundation.offcanvas',
    'foundation.accordion',
    'modernizr'
], function(
    Offcanvas,
    Navigation,
    Flat,
    Catalog,
    PhotoSwipe) {

    var init = function(config) {
        var catalog = new Catalog(config);

        $('body').append(new Offcanvas(catalog)).append(new PhotoSwipe());

        $(document).foundation({
            offcanvas : {
                open_method: 'overlap',
                close_on_click : false
            },
            accordion : {
                toggleable: false
            }
        });

        new Navigation(catalog);
    };

    $.getJSON( "config/catalog.json", init);
});