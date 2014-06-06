export default Ember.Component.extend({
    size         : '200',
    style        : "",
    gravatarURL  : function() {
        return "http://www.gravatar.com/avatar/"+md5(this.get('email'))+"?s="+this.get('size');
    }.property('email', 'size'),
    'data-style' : function() {
        return this.get('style');
    }.property('style')
});
