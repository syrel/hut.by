/**
 * Created by aliaksei on 28/12/15.
 */
define([
    'hutby/announcements/OnUserChanged',
    'header',
    'div',
    'img',
    'span'
], function(
    OnUserChanged,
    Header,
    Div,
    Img,
    Span
    ){

    function MaterialUser(user) {
        var _this = new Header();

        var signIn;
        var avatar;
        var username;
        var email;

        _this.initialize = function() {
            signIn = _this.buildSignInButton();
            user.attachTo(signIn[0]);
            user.announcer().onSendTo(OnUserChanged, _this.refresh, _this);
        };

        _this.refresh = function(){
            _this.empty();
            _this.add(signIn);
            // create new elements to get rid of previous user data
            avatar = _this.buildAvatar();
            username = _this.buildUsername();
            email = _this.buildEmail();

            if (user.isSigned())
                _this.initializeUser();
            else
                signIn.gone(false);
            componentHandler.upgradeDom();
        };

        _this.initializeUser = function() {
            signIn.gone(true);
            avatar.src(user.avatar());
            username.text(user.username());
            email.text(user.email());

            _this.add(_this.buildBasicInfo());
            _this.add(_this.buildOptions());
        };

        _this.buildBasicInfo = function() {
            var line = _this.buildLine();
            line.add(avatar);
            line.add(username);
            return line;
        };

        _this.buildOptions = function() {
            var line = _this.buildLine();
            line.add(email);
            line.add(_this.buildSpacer());
            line.add(_this.buildDropDown());
            line.find('.sign-out').click(function(){
                user.signOut();
            });
            return line;
        };

        _this.buildSignInButton = function() {
            var button = new Div().class('sign-in').gone(true);
            var icon = new Span().class('icon');
            var label = new Span().class('label').text('Войти');
            button.add(icon).add(label);
            return button;
        };

        _this.buildAvatar = function() {
            return new Img().class('avatar');
        };

        _this.buildUsername = function(){
            return new Span().class('username');
        };

        _this.buildEmail = function(){
            return new Span();
        };

        _this.buildLine = function() {
            return new Div().class('line');
        };

        _this.buildSpacer = function() {
            return new Div().class('mdl-layout-spacer');
        };

        _this.buildDropDown = function(){
            return $(
                '<button id="user-options" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">'+
                    '<i class="material-icons" role="presentation">arrow_drop_down</i>'+
                    '<span class="visuallyhidden">Accounts</span>'+
                '</button>'+
                '<ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" for="user-options">'+
                    '<li class="mdl-menu__item sign-out"><i class="material-icons">power_settings_new</i>Выйти...</li>'+
                '</ul>');
        };

        _this.initialize();

        return _this;
    }

    return MaterialUser;

});