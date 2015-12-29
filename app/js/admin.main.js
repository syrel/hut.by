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
], function (User, Catalog, MaterialUser, MaterialHeader, MaterialFlatList, MaterialFlatEditor, OnUserSignedIn, OnUserSignedOut) {

    var init = function (config) {
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

        user.announcer().onSendTo(OnUserSignedIn, function () {
            flatList.show();
            header.show();
            flatEditor.show();
            $('.save').css('visibility','visible');
        }, this);

        user.announcer().onSendTo(OnUserSignedOut, function () {
            flatList.hide();
            header.hide();
            flatEditor.hide();
            $('.save').css('visibility','hidden');
        }, this);

        catalog.allFlats()[0].expand();

        $('.save').click(function () {
            var button = $(this);
            if (button.data('executing')) return;
            button.data('executing', true);
            button.addClass('mdl-button--disabled');
            button.html('Сохранение...');

            var reset = function(){
                button.data('executing', false);
                button.removeClass('mdl-button--disabled');
                button.html('Сохранить');
            };

            $.ajax({
                url: "http://hut.by/hut.by/save.php",
                type: "POST",
                data: { user: user.toJSON(), catalog: catalog.toJSON() },
                dataType: "json",
                success: function (result) {
                    console.log(result);
                    reset();
                    var notification = document.querySelector('.mdl-js-snackbar');
                    var data = {
                        message: (result.success) ? 'Сохранено' : result.error,
                        timeout: 2000
                    };
                    notification.MaterialSnackbar.showSnackbar(data);
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    reset();
                }
            });
        });

        componentHandler.upgradeDom();
    };
    $.getJSON('config/catalog.json', init);
});