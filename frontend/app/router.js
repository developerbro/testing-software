var Router = Ember.Router.extend({
  location: ENV.locationType
});

Router.map(function() {
    this.resource('users', function() {
        this.resource('user', {path: ':user_id'});
    });
});

export default Router;
