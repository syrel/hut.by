/**
 * Created by aliaksei on 27/12/15.
 */
define([
    'nav',
    'a',
    'dictionary',
    'hutby/announcements/OnFlatExpanded',
    'hutby/announcements/OnFlatCollapsed'
], function(
    Nav,
    A,
    Dictionary,
    OnFlatExpanded,
    OnFlatCollapsed
){

    function MaterialFlatList(catalog) {
        var _this = new Nav().class('demo-navigation').class('mdl-navigation').class('mdl-color--blue-grey-800');

        var flatLinks = new Dictionary();

        _this.initialize = function() {
            _this.createLinks();
            catalog.announcer().onSendTo(OnFlatExpanded, _this.onFlatExpanded, _this);
            catalog.announcer().onSendTo(OnFlatCollapsed, _this.onFlatCollapsed, _this);
        };

        _this.createLinks = function () {
            _.each(catalog.allFlats(), function(flat) {
                var link = _this.buildLink(flat);
                flatLinks.put(flat, link);
            });
        };

        _this.buildLink = function(flat) {
            var link = new A().class('mdl-navigation__link').href('#');
            link.click(function(e){
                e.preventDefault();
                flat.expand();
            });
            if(flat.isExpanded())
                link.active(true);

            link.bindText(flat.addressHolder());

            return link;
        };

        _this.addLinks = function() {
            flatLinks.each(function(flat, link){
                _this.add(link);
                link.click(function(e){
                    e.preventDefault();
                    flat.expand();
                });
            });
            componentHandler.upgradeDom();
        };

        _this.onFlatExpanded = function (ann) {
            flatLinks.get(ann.flat()).active(true);
        };

        _this.onFlatCollapsed = function (ann) {
            flatLinks.get(ann.flat()).active(false);
        };

        _this.show = function() {
            _this.hide();
            _this.addLinks();
        };

        _this.hide = function(){
            _this.empty();
        };

        _this.initialize();


        return _this;
    }

    return MaterialFlatList;
});