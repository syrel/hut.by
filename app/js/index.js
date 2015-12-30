/**
 * Created by aliaksei on 02/08/14.
 */

define([
    'config',
    'hutby/common/Flat',
    'hutby/common/Catalog',
    'hutby/ui/offcanvas/Offcanvas',
    'hutby/ui/Navigation',
    'hutby/ui/PhotoSwipe',
	'underscore',
    'jquery',
	'jquery.me',
    'foundation',
    'foundation.offcanvas',
    'foundation.accordion',
    'modernizr'
], function(
    Config,
    Flat,
    Catalog,
    Offcanvas,
    Navigation,
    PhotoSwipe) {

    var init = function(config) {
        var catalog = new Catalog(config);

        $('body')
            .append(new Offcanvas(catalog))
            .append(new PhotoSwipe());

        new Navigation(catalog);

        $(document).foundation({
            offcanvas : {
                open_method: 'overlap',
                close_on_click : false
            },
            accordion : {
                toggleable: false
            }
        });
    };

    $.getJSON(Config.catalogUrl, init);
});