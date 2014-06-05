export default Ember.Route.extend({
    actions : {
        error: function(reason, transition) {
            if (reason.status===401)
                this.transitionTo('login');
            else {
                console.log('something error happened...');
            }
        }
    }
});
