/**
 * Created by aliaksei on 02.01.2015.
 */


define([
    'jquery',
    'hutby/ui/offcanvas/OffcanvasMenuCategories',
    'hutby/announcements/OnCategoryExpanded',
    'hutby/announcements/OnCategoryCollapsed'
], function (
    $,
    OffcanvasMenuCategories,
    OnCategoryExpanded,
    OnCategoryCollapsed
    ) {
    function OffcanvasMenu(catalog) {
        var _this = $('<div class="hutby-sidenav-footer-position-wrapper"></div>');

        var homeLink = $('<a class="hutby-sidenav-header-link" href="index.html">hut.by</a>');
        var header = $('<h1>сеть квартир<span><small>гостиничного типа</small></span>без посредников</h1>');
        var footerHelper = $('<div class="hutby-sidenav-footer-position-helper"></div>');
        var otherLinks = $('<ul>'+
        '<li><a class="side-nav-link" href="#">Связаться с нами</a></li>'+
        '<li><a class="side-nav-link" href="#">Карта Минска</a></li>'+
        '</ul>');

        _this.initialize = function () {
            _this.initializeHeader();
            _this.append(new OffcanvasMenuCategories(catalog));
            _this.initializeLinks();
            _this.append(footerHelper);

            catalog.announcer().onSendTo(OnCategoryExpanded, _this.onCategoryExpanded, _this);
            catalog.announcer().onSendTo(OnCategoryCollapsed, _this.onCategoryCollapsed, _this);
        };

        _this.initializeLinks = function () {
            _this.append(otherLinks);
            if (!catalog.isCategoryExpanded()){
                _this.alignLinkCenter();
            }
            else _this.alignLinkLeft();
        };

        _this.initializeHeader = function () {
            _this.append(homeLink);
            _this.append(header);
            _this.append($('<hr>'));
            homeLink.click(function(e){
                e.preventDefault();
                if (catalog.isCategoryExpanded())
                    catalog.collapseCategory(true);
            });
        };

        _this.onCategoryExpanded = function() {
            _this.alignLinkLeft();
        };

        _this.onCategoryCollapsed = function(){
            _this.alignLinkCenter();
        };

        _this.alignLinkCenter = function() {
            otherLinks.find('.side-nav-link').css('text-align','center');
        };

        _this.alignLinkLeft = function() {
            otherLinks.find('.side-nav-link').css('text-align','left');
        };

        _this.initialize();

        return _this;
    }
    return OffcanvasMenu;
});