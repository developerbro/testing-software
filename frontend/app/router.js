var Router = Ember.Router.extend({
  location: ENV.locationType
});

Router.map(function() {
//    this.route('users');
    this.resource('users');
});

export default Router;
