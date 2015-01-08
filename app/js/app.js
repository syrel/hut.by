/**
 * Created by aliaksei on 03/08/14.
 */

require.config({
    baseUrl: 'js/',

    paths: {
        'polymorphism' : 'hutby/lib/Polymorphism',
        'modernizr' : 'vendor/modernizr',
        'jquery' : 'vendor/jquery',
        'jquery.animo' : 'vendor/jquery.animo',
        'jquery.cookie' : 'vendor/jquery.cookie',
        'jquery.mousewheel' : 'vendor/jquery.mousewheel',
        'jquery.mousewheelIntent' : 'vendor/jquery.mousewheelIntent',
        'jquery.jscrollpane' : 'vendor/jquery.jscrollpane',
        'foundation' : 'foundation/foundation',
        'foundation.offcanvas' : 'foundation/foundation.offcanvas',
        'foundation.accordion' : 'foundation/foundation.accordion',
        'dom' : 'hutby/lib/dom/Dom',
        'div' : 'hutby/lib/dom/Div'
    },

    shim: {
        'polymorphism' : {},
        'jquery.animo' : ['jquery'],
        'jquery.cookie' : ['jquery'],
        'jquery.mousewheel' : ['jquery'],
        'jquery.mousewheelIntent' : ['jquery'],
        'jquery.jscrollpane' : ['jquery', 'jquery.mousewheel', 'jquery.mousewheelIntent'],
        'foundation' : ['jquery'],
        'foundation.offcanvas' : ['foundation', 'jquery'],
        'foundation.accordion' : ['foundation', 'jquery']
    }
});

requirejs(['modernizr','jquery','foundation','foundation.offcanvas', 'foundation.accordion'], function(){
    requirejs(['main']);
});