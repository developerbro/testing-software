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
            if (Em.isEmpty(u.username )) { Notify.alert('хэрэглэгчийн нэр оруулна уу!'); return; }
            if (Em.isEmpty(u.useremail)) { Notify.alert('и-мэйл хаягаа оруулна уу!'); return; }
            if (Em.isEmpty(u.userpass )) { Notify.alert('нууц үг оруулна уу!'); return; }
            if (!Em.isEqual(u.userpass, u.userpassconfirm)) { Notify.alert('нууц үг ижилхэн оруулна уу!'); return; }
            Em.$.ajax({type: "POST", contentType: "application/json; charset=utf-8", dataType: "json",
                url: "api/v1/auth/register", data: JSON.stringify(u),
                success: function (data) {
                    self.setProperties({'username':'','useremail':'','userpass':'','userpassconfirm':''});
                    self.transitionToRoute('login');
                },
                error: function(response) {
                    console.log(response);
                    self.setProperties({'username':'','useremail':'','userpass':'','userpassconfirm':''});
                    self.transitionToRoute('login');
                }
            });

        }
    }
});
