/**
 * Created by aliaksei on 03/08/14.
 */
require.config({
    baseUrl: 'js/',

    paths: {
        'jquery' : 'vendor/jquery',
        'jquery.animo' : 'vendor/jquery.animo',
        'jquery.cookie' : 'vendor/jquery.cookie',
        'jquery.mousewheel' : 'vendor/jquery.mousewheel',
        'jquery.mousewheelIntent' : 'vendor/jquery.mousewheelIntent',
        'jquery.jscrollpane' : 'vendor/jquery.jscrollpane',
        'foundation' : 'foundation/foundation',
        'foundation.offcanvas' : 'foundation/foundation.offcanvas',
        'foundation.accordion' : 'foundation/foundation.accordion'
    },

    shim: {
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

requirejs(['main']);