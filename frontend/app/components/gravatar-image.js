export default Ember.Component.extend({
    size         : '200',
    'data-style' : "",
    gravatarURL  : function() {
        return "http://www.gravatar.com/avatar/"+md5(this.get('email'))+"?s="+this.get('size');
    }.property('email', 'size'),
    style        : function() {
        return this.get('data-style');
    }.property('data-style')
});
