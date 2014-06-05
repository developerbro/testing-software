export default Ember.ObjectController.extend({
    actions : {
        save : function() {
            var self = this;
            this.get('content').save().then(function(user) {
                self.transitionToRoute('users');
            }, function(reason) {
                self.get('content').rollback();
                alert('cannot saved!');
                self.transitionToRoute('users');
            });
        },
        cancel : function() {
            this.get('content').rollback();
            this.transitionToRoute('users');
        }
    }
});
