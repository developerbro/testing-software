export default Ember.Object.extend({
    isLoggedin : false,
       name       : '',
       email      : '',
       avatarURL  : '',
       authToken  : localStorage.token,
       authTokenObserver : function() {
           var self = this;
           Ember.$.ajaxPrefilter(function(options, oriOptions, jqXHR) {
               var token = "auth_token "+self.get('authToken');
               jqXHR.setRequestHeader('Authorization', token);
           });
       }.observes('authToken'),
});
