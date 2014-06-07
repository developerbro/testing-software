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
           var content = this.get('content');
           if (Em.isEmpty(content.get('title'))) {
                Notify.alert('title shouldnt be empty!');
                return;
           }
           if (Em.isEmpty(content.get('question'))) {
                Notify.alert('question shouldnt be empty!');
                return;
           }
           this.get('content').save().then(function(quiz) {
               Notify.alert('successfully saved!');
           }, function(reason){
               Notify.alert('cannot saved!');
           });
       }
    }
});
