import Session from 'frontend/objects/session';

export default {
    name       : 'injectSession',
    before     : 'store',
    initialize : function(container, application) {
        var session = Session.create();
        if (localStorage.token) {
            Em.$.ajax({type: "POST", contentType: "application/json; charset=utf-8", dataType: "json",
                url: "api/v1/auth", data: JSON.stringify({token: localStorage.token}),
                success: function (data) {
                    session.setProperties({
                        isLoggedin : true,
                        name       : data.username,
                        email      : data.email,
                        authToken  : data.token
                    });
                    Ember.$.ajaxPrefilter(function(options, oriOptions, jqXHR) {
                        var token = "auth_token "+data.token;
                        jqXHR.setRequestHeader('Authorization', token);
                    });
                },
                error: function(response) {
                    localStorage.clear();
                }
            });
        }
        application.register('session:main', session, {instantiate: false, singleton: true});
        container.typeInjection('controller', 'session', 'session:main');
        container.typeInjection('route'     , 'session', 'session:main');
        container.typeInjection('component' , 'session', 'session:main');
        container.typeInjection('view'      , 'session', 'session:main');
    }
};
