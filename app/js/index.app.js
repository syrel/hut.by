/**
 * Created by aliaksei on 03/08/14.
 */

require.config({
    baseUrl: 'js/',

    paths: {
        'dictionary' : 'hutby/lib/AnnouncerJS/src/Dictionary',
        'announcer' : 'hutby/lib/AnnouncerJS/src/Announcer',
        'polymorphism' : 'hutby/lib/Polymorphism',
        'modernizr' : 'vendor/modernizr',
        'jquery' : 'vendor/jquery',
        'jquery.me' : 'hutby/lib/jquery.me',
        'jquery.animo' : 'vendor/jquery.animo',
        'jquery.cookie' : 'vendor/jquery.cookie',
        'jquery.mousewheel' : 'vendor/jquery.mousewheel',
        'jquery.mousewheelIntent' : 'vendor/jquery.mousewheelIntent',
        'jquery.jscrollpane' : 'vendor/jquery.jscrollpane',
        'foundation' : 'foundation/foundation',
        'foundation.offcanvas' : 'foundation/foundation.offcanvas',
        'foundation.accordion' : 'foundation/foundation.accordion',
        'underscore' : 'vendor/underscore-min',
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
        'span' : 'hutby/lib/dom/Span'
    },

    shim: {
        'jquery': {
            exports: '$'
        },
        'underscore': {
            exports: '_'
        },
        'polymorphism' : {},
        'jquery.me' : ['jquery'],
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

requirejs(['modernizr','jquery','jquery.me','foundation','foundation.offcanvas', 'foundation.accordion'], function(){
    requirejs(['index.main']);
});