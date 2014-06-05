export default Ember.Route.extend({
    model: function(param) {
        return this.store.find('user', param.user_id);
    }
});
