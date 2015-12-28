
define([
    'hutby/common/User',
    'hutby/common/Catalog',
    'hutby/ui/editor/MaterialUser',
    'hutby/ui/editor/MaterialHeader',
    'hutby/ui/editor/MaterialFlatList',
    'hutby/ui/editor/MaterialFlatEditor',
    'hutby/announcements/OnUserSignedIn',
    'hutby/announcements/OnUserSignedOut',
    'underscore',
    'jquery',
    'jquery.me',
    'jquery.ui',
    'material'
], function(
    User,
    Catalog,
    MaterialUser,
    MaterialHeader,
    MaterialFlatList,
    MaterialFlatEditor,
    OnUserSignedIn,
    OnUserSignedOut) {

    var init = function(config) {
        var catalog = new Catalog(config);
        var user = new User();

        var userView = new MaterialUser(user);
        $('.drawer').append(userView);

        var header = new MaterialHeader(catalog);
        $('.demo-header').prepend(header);

        var flatList = new MaterialFlatList(catalog);
        $('.drawer').append(flatList);

        var flatEditor = new MaterialFlatEditor(catalog);
        $('main.mdl-layout__content').append(flatEditor);

        user.announcer().onSendTo(OnUserSignedIn, function(){
            flatList.show();
            header.show();
            flatEditor.show();
        }, this);

        user.announcer().onSendTo(OnUserSignedOut, function(){
            flatList.hide();
            header.hide();
            flatEditor.hide();
        }, this);

        catalog.allFlats()[0].expand();

        componentHandler.upgradeDom();
    };

    $.getScript( "js/config.js", function(){init(_config)}).error(function() {
        require(['config'], function(){init(_config)});
    });
});