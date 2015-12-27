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

    var init = function(flats) {
        var catalog = new Catalog();
        _.each(flats, function(flat){
            catalog.addFlat(new Flat(flat));
        });

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

    $.getScript( "js/config.js", function(){init(_config)}).error(function() {
        require(['config'], function(){init(_config)});
    });
});