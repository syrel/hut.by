/**
 * Created by aliaksei on 27/12/15.
 */
define([
    'nav',
    'a',
    'button',
    'i',
    'dictionary',
    'hutby/announcements/OnFlatExpanded',
    'hutby/announcements/OnFlatCollapsed',
    'hutby/announcements/OnFlatAdded',
    'hutby/announcements/OnFlatRemoved'
], function(
    Nav,
    A,
    Button,
    I,
    Dictionary,
    OnFlatExpanded,
    OnFlatCollapsed,
    OnFlatAdded,
    OnFlatRemoved
){

    function MaterialFlatList(catalog) {
        var _this = new Nav().class('demo-navigation').class('mdl-navigation').class('mdl-color--blue-grey-800');

        var flatLinks = new Dictionary();

        _this.initialize = function() {};

        _this.createLinks = function () {
            flatLinks = new Dictionary();
            _.each(catalog.allFlats(), _this.createLink);
        };

        _this.createLink = function(flat) {
            var link = _this.buildLink(flat);
            flatLinks.put(flat, link);
            return link;
        };

        _this.buildAddButton = function() {
            var button = new Button();
            button
                .class('add')
                .class('mdl-button')
                .class('mdl-js-button')
                .class('mdl-button--fab')
                .class('mdl-js-ripple-effect')
                .class('mdl-button--colored');
            button.add(new I().class('material-icons').text('add'));
            button.click(function(){
                catalog.newFlat().expand();
            });
            return button;
        };

        _this.buildLink = function(flat) {
            var link = new A().class('mdl-navigation__link').href('#');
            if(flat.isExpanded())
                link.active(true);
            link.click(function(e){
                e.preventDefault();
                _this.hideDrawer();
                flat.expand();
            });
            link.data('flat', flat);
            link.bindText(flat.addressHolder());

            return link;
        };

        _this.hideDrawer = function(){
            if ($('.drawer').hasClass('is-visible'))
                $('.mdl-layout__drawer-button').click();
        };

        _this.addLinks = function() {
            _this.add(_this.buildAddButton());
            flatLinks.each(function(flat, link){
                _this.add(link);
            });
            _this.initializeSortable();
            componentHandler.upgradeDom();
        };

        _this.onFlatExpanded = function (ann) {
            flatLinks.get(ann.flat()).active(true);
        };

        _this.onFlatCollapsed = function (ann) {
            flatLinks.get(ann.flat()).active(false);
        };

        _this.onFlatAdded = function (ann) {
            _this.add(_this.createLink(ann.flat()));
            _this.initializeSortable();
            componentHandler.upgradeDom();
        };

        _this.onFlatRemoved = function (ann) {
            flatLinks.get(ann.flat()).remove();
            _this.initializeSortable();
            componentHandler.upgradeDom();
        };

        _this.initializeSortable = function(){
            _this.sortable({
                revert: 100,
                distance: 5,
                axis: "y",
                items: "> .mdl-navigation__link",
                update: function( ) {
                    var flats = _.map($(this).children('.mdl-navigation__link'), function(each){
                        return $(each).data('flat');
                    });
                    catalog.reorder(flats);
                }
            });
        };

        _this.show = function() {
            _this.hide();
            catalog.announcer().onSendTo(OnFlatExpanded, _this.onFlatExpanded, _this);
            catalog.announcer().onSendTo(OnFlatCollapsed, _this.onFlatCollapsed, _this);
            catalog.announcer().onSendTo(OnFlatAdded, _this.onFlatAdded, _this);
            catalog.announcer().onSendTo(OnFlatRemoved, _this.onFlatRemoved, _this);
            _this.createLinks();
            _this.addLinks();
        };

        _this.hide = function(){
            catalog.announcer().unsubscribe(_this);
            _this.empty();
        };

        _this.initialize();


        return _this;
    }

    return MaterialFlatList;
});