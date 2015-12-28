/**
 * Created by aliaksei on 28/12/15.
 */
define([
    'announcer',
    'hutby/announcements/OnUserChanged',
    'hutby/announcements/OnUserSignedIn',
    'hutby/announcements/OnUserSignedOut'
], function(
    Announcer,
    OnUserChanged,
    OnUserSignedIn,
    OnUserSignedOut
    ){

    function User(){
        var _this = this;

        var username = null;
        var avatar = null;
        var email = null;
        var token = null;

        var auth2;
        var attachLater = [];
        var announcer = new Announcer();

        _this.avatar = function(){
            return avatar;
        };

        _this.username = function(){
            return username;
        };

        _this.email = function(){
            return email;
        };

        _this.announcer = function(){
            return announcer;
        };

        _this.initialize = function () {
            gapi.load('auth2', _this.initializeSigninV2);
        };

        _this.initializeSigninV2 = function () {
            auth2 = gapi.auth2.init({
                client_id: '358283063681-mbj303233tn779lib2dk5c90crv50vdp.apps.googleusercontent.com',
                cookiepolicy: 'single_host_origin'
            });
            auth2.isSignedIn.listen(_this.signinChanged);
            auth2.currentUser.listen(_this.userChanged);
            if (auth2.isSignedIn.get() == true)
                auth2.signIn();
            _this.attachAll();
        };

        _this.signinChanged = function (isSigned) {

        };

        _this.userChanged = function (googleUser) {
            _this.reset();
            if (!googleUser.isSignedIn()) {
                _this.notifySignedOut();
            }
            else {
                _this.initializeWith(googleUser);
                _this.notifySignedIn();
            }
            _this.announcer().announce(new OnUserChanged());
        };

        _this.initializeWith = function (googleUser) {
            var profile = googleUser.getBasicProfile();
            username = profile.getName();
            avatar = profile.getImageUrl();
            email = profile.getEmail();
            token = googleUser.getAuthResponse().id_token;
        };

        _this.isSigned = function () {
            return !_.isNull(token);
        };

        _this.attachTo = function (element) {
            if (_.isUndefined(auth2))
                attachLater.push(element);
            _this.attachAll();
        };

        _this.attachAll = function () {
            if (_.isUndefined(auth2)) return;

            var tobeAttached = attachLater;
            attachLater = [];

            _.each(tobeAttached, function(element){
                auth2.attachClickHandler(element, {},
                    function(googleUser) {
                        _this.userChanged(googleUser);
                    }, function(error) {
                        alert(JSON.stringify(error, undefined, 2));
                    });
            })
        };

        _this.signOut = function() {
            if (!_.isUndefined(auth2))
                auth2.disconnect();
        };

        _this.notifySignedOut = function(){
            _this.announcer().announce(new OnUserSignedOut());
        };

        _this.notifySignedIn = function(){
            _this.announcer().announce(new OnUserSignedIn());
        };

        _this.toJSON = function() {
            return {
                username: username,
                avatar: avatar,
                email: email,
                token: token
            };
        };

        _this.reset = function(){
            username = null;
            avatar = null;
            email = null;
            token = null;
        };

        _this.initialize();
    }

    return User;

});