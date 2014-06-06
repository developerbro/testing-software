import AuthenticatedRoute from 'frontend/routes/authenticated';

export default AuthenticatedRoute.extend({
    model : function(params) {
        return this.store.find('quiz', params.quiz_id);
    }
});
