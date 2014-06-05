var Router = Ember.Router.extend({
  location: ENV.locationType
});

Router.map(function() {
    this.resource('users', function() {
        this.resource('user', {path: ':user_id'});
        this.resource('users-new', {path: '/new'});
    });
});

export default Router;
