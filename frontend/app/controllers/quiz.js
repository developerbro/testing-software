import Notify from 'ember-notify';

export default Ember.ObjectController.extend({
    actions: {
        delete: function(params) {
            var self = this;
            this.store.find('quiz', params.id).then(function(quiz){
                quiz.destroyRecord().then(function(response) {
                    Notify.alert('successfully deleted!');
                    self.transitionToRoute('quizzes-index');
                }, function(reason){
                    quiz.rollback();
                });
            }, function(reason){
            });
        },
       save: function(params) {
           this.get('content').save().then(function(quiz) {
               Notify.alert('successfully saved!');
           }, function(reason){
               Notify.alert('cannot saved!');
           });
       }
    }
});
