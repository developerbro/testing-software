export default Ember.ObjectController.extend({
    actions: {
        logout: function() {
            var session = this.get('session');
            session.setProperties({
                isLoggedin : false,
                name       : '',
                email      : '',
                avatarURL  : '',
                authToken  : ''
            });
            localStorage.clear();
            this.transitionToRoute('login');
        }
    }
});
