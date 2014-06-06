export default Ember.Handlebars.makeBoundHelper(function(value, options){
    var maxLength = 16;
    if (value.length>maxLength)
        return value.substring(0, maxLength)+'...';
    return value;
});
