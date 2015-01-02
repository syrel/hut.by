/**
 * Created by aliaksei on 02.01.2015.
 */

define(['jquery'], function ($){

    function OffcanvasMenuFooter () {
        var _this = $('<div class="hutby-sidenav-footer">'+
        '<hr>'+
        '<ul>'+
            '<li><a href="tel:+375293990099">+375 29 399 00 99</a></li>'+
            '<li><a href="mailto:mail@hut.by">mail@hut.by</a></li>'+
        '</ul>'+
        '</div>');
        return _this;
    }

    return OffcanvasMenuFooter;

});