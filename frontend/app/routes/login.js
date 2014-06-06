export default Ember.Route.extend({
    loggedinObserver : function() {
        if (this.get('session.isLoggedin')) {
            this.transitionTo('index');
        }
    }.observes('session.isLoggedin')
});
