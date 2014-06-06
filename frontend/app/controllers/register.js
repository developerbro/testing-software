import Notify from 'ember-notify';

export default Ember.ObjectController.extend({
    username        : '',
    useremail       : '',
    userpass        : '',
    userpassconfirm : '',
    actions: {
        register: function() {
            var self = this;
            var u = this.getProperties('username', 'useremail', 'userpass', 'userpassconfirm');
            if (Em.isEmpty(u.username )) { Notify.warning('please insert user name!'); return; }
            if (Em.isEmpty(u.useremail)) { Notify.warning('please insert email!'); return; }
            if (Em.isEmpty(u.userpass )) { Notify.warning('please insert password!'); return; }
            if (!Em.isEqual(u.userpass, u.userpassconfirm)) { Notify.warning('please insert same repeated password!'); return; }
            Em.$.ajax({type: "POST", contentType: "application/json; charset=utf-8", dataType: "json",
                url: "api/v1/auth/register", data: JSON.stringify(u),
                success: function (data) {
                    self.setProperties({'username':'','useremail':'','userpass':'','userpassconfirm':''});
                    self.transitionToRoute('login');
                },
                error: function(response) {
                    if (response.status===422) {
                        self.setProperties({'username':'','useremail':'','userpass':'','userpassconfirm':''});
                        Notify.warning('User already registered and try another!');
                    }
                }
            });

        }
    }
});
