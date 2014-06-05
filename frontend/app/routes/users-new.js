export default Ember.Route.extend({
    model: function() {
        return this.store.createRecord('user');
    },
    deactivate: function() {
        var content = this.controllerFor('users-new').get('content');
        if (content.get('isDirty')) {
            content.rollback();
        }
    }
});
