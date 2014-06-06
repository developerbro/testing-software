import Notify from 'ember-notify';

export default Ember.ObjectController.extend({
    username : '',
    password : '',
    actions  : {
        login : function() {
            var self = this; var session = this.get('session');
            var u = this.getProperties('username', 'password');
            Em.$.ajax({type: "POST", contentType: "application/json; charset=utf-8", dataType: "json",
                url: "api/v1/auth/login", data: JSON.stringify(u),
                success: function (data) {
                    session.setProperties({
                        isLoggedin : true,
                        name       : data.username,
                        email      : data.email,
                        authToken  : data.token
                    });
                    localStorage.token = data.token;
                    self.setProperties({username : '', password : ''});
                    self.transitionToRoute('index');
                },
                error: function(response) {
                    self.setProperties({username : '', password : ''});
                    Notify.warning('cannot login please try another!');
                }
            });
        },
        register: function() {
            this.transitionToRoute('register');
        }
    }
});
