
require.config({
    baseUrl: 'js/',

    paths: {
        'dictionary' : 'hutby/lib/AnnouncerJS/src/Dictionary',
        'announcer' : 'hutby/lib/AnnouncerJS/src/Announcer',
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
        'ul' : 'hutby/lib/dom/Ul'
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