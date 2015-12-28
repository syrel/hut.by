
require.config({
    baseUrl: 'js/',

    paths: {
        'dictionary' : 'hutby/lib/AnnouncerJS/src/Dictionary',
        'announcer' : 'hutby/lib/AnnouncerJS/src/Announcer',
        'polymorphism' : 'hutby/lib/Polymorphism',
        'jquery' : 'vendor/jquery',
        'jquery.me' : 'hutby/lib/jquery.me',
        'underscore' : 'vendor/underscore-min',
        'material' : 'vendor/material',
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
        'label' : 'hutby/lib/dom/Label'
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
        'jquery.me' : ['jquery']
    }
});

requirejs(['jquery','jquery.me'], function(){
    requirejs(['admin.main']);
});