/**
 * Created by aliaksei on 30/12/15.
 */
require.config({
    baseUrl: 'js/',

    paths: {
        'config' : 'hutby/config',

        'utils' : 'hutby/lib/Utils',
        'dictionary' : 'hutby/lib/AnnouncerJS/src/Dictionary',
        'announcer' : 'hutby/lib/AnnouncerJS/src/Announcer',
        'polymorphism' : 'hutby/lib/Polymorphism',
        'modernizr' : 'vendor/modernizr',

        'underscore' : 'vendor/underscore-1.8.3',
        'material' : 'vendor/material-1.0.6',
        'gapi' : 'https://apis.google.com/js/api:client.js',

        /* jQuery */
        'jquery' : 'jquery/jquery-1.11.3',
        'jquery.ui' : 'jquery/jquery.ui-1.11.4',
        'jquery.me' : 'jquery/jquery.me-1.0.0',
        'jquery.animo' : 'jquery/jquery.animo-1.0.2',
        'jquery.mousewheel' : 'jquery/jquery.mousewheel-3.1.13',
        'jquery.mousewheelIntent' : 'jquery/jquery.mousewheelIntent-1.2.0',
        'jquery.jscrollpane' : 'jquery/jquery.jscrollpane-2.0.22',

        /* Foundation */
        'foundation' : 'foundation/foundation',
        'foundation.offcanvas' : 'foundation/foundation.offcanvas',
        'foundation.accordion' : 'foundation/foundation.accordion',

        /* Dom */
        'a' : 'hutby/lib/dom/A',
        'aside' : 'hutby/lib/dom/Aside',
        'dd' : 'hutby/lib/dom/Dd',
        'dom' : 'hutby/lib/dom/Dom',
        'div' : 'hutby/lib/dom/Div',
        'img' : 'hutby/lib/dom/Img',
        'li' : 'hutby/lib/dom/Li',
        'p' : 'hutby/lib/dom/P',
        'ul' : 'hutby/lib/dom/Ul',
        'nav' : 'hutby/lib/dom/Nav',
        'main' : 'hutby/lib/dom/Main',
        'h3' : 'hutby/lib/dom/H3',
        'input' : 'hutby/lib/dom/Input',
        'label' : 'hutby/lib/dom/Label',
        'header' : 'hutby/lib/dom/Header',
        'span' : 'hutby/lib/dom/Span',
        'button' : 'hutby/lib/dom/Button',
        'i' : 'hutby/lib/dom/I'
    },

    shim: {
        'jquery': {
            exports: '$'
        },
        'underscore': {
            exports: '_'
        },
        'material' : {
            exports: 'componentHandler',
            init: function () {
                componentHandler.upgradeDom();
                return componentHandler;
            }
        },
        'gapi' : {
            exports: 'gapi'
        },
        'polymorphism' : {
            'exports': 'override'
        },
        'jquery.ui' : ['jquery'],
        'jquery.me' : ['jquery'],
        'jquery.animo' : ['jquery'],
        'jquery.mousewheel' : ['jquery'],
        'jquery.mousewheelIntent' : ['jquery'],
        'jquery.jscrollpane' : ['jquery', 'jquery.mousewheel', 'jquery.mousewheelIntent'],
        'foundation' : ['jquery', 'modernizr'],
        'foundation.offcanvas' : ['foundation', 'jquery'],
        'foundation.accordion' : ['foundation', 'jquery']
    }
});