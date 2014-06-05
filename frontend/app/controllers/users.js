export default Ember.ArrayController.extend({
    actions : {
        delete: function(param) {
            var self = this;
            this.store.find('user', param.id).then(function(user) {
                console.log(user.get('name'));
                user.destroyRecord().then(function(response) {
                    self.transitionToRoute('users');
                }, function(reason) {
                    user.rollback();
                });
            }, function(reason) {
                console.log('cannot delete user : '+reason);
            });
        }
    }
});
