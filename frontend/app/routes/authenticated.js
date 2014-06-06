export default Ember.Route.extend({
    actions : {
        error: function(reason, transition) {
            if (reason.status===401||
                reason.status===400)
                this.transitionTo('login');
        }
    }
});
