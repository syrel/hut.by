/**
 * Created by DimDim on 24.06.2015.
 */

define([
    'jquery'
], function(
    $
    ){

    function PhotoSwipe(){
        var _this = $('<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true"></div>');
        var background = $('<div class="pswp__bg"></div>');
        _this.append(background);
        var wrapper = $('<div class="pswp__scroll-wrap"></div>');
        var container = $('<div class="pswp__container"></div>');
        container.append('<div class="pswp__item"></div>');
        container.append('<div class="pswp__item"></div>');
        container.append('<div class="pswp__item"></div>');
        wrapper.append(container);
        var ui = $('<div class="pswp__ui pswp__ui--hidden"></div>');
        var topBar = $('<div class="pswp__top-bar"></div>');
        topBar.append('<div class="pswp__counter"></div>' +
            '<button class="pswp__button pswp__button--close" title="Close (Esc)"></button>' +
            '<button class="pswp__button pswp__button--share" title="Share"></button>' +
            '<button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>' +
            '<button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>' +
            '<div class="pswp__preloader">' +
                '<div class="pswp__preloader__icn">' +
                    '<div class="pswp__preloader__cut">' +
                        '<div class="pswp__preloader__donut"></div>' +
                    '</div>' +
                '</div>' +
            '</div>');
        ui.append(topBar);
        ui.append(' <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap"><div class="pswp__share-tooltip"></div></div>');
        ui.append('<button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>');
        ui.append(' <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>');
        ui.append('<div class="pswp__caption"><div class="pswp__caption__center"></div></div>');
        wrapper.append(ui);
        _this.append(wrapper);

        return _this;
    }

    return PhotoSwipe;
});