import AuthenticatedRoute from 'frontend/routes/authenticated';

export default AuthenticatedRoute.extend({
    model : function(params) {
        return this.store.createRecord('quiz');
    },
    deactivate: function() {
        var content = this.controllerFor('quizzes-new').get('content');
        if (content.get('isDirty')) {
            content.rollback();
        }
    }
});
