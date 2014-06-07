import Notify from 'ember-notify';

export default Ember.ObjectController.extend({
    actions: {
        save: function() {
            var content = this.get('content');
            if (Em.isEmpty(content.get('title'))) {
                Notify.warning('Please insert title!');
                return;
            }
            if (Em.isEmpty(content.get('question'))) {
                Notify.warning('Please insert question!');
                return;
            }
            var self = this;
            this.get('content').save().then(function(quiz) {
                Notify.alert('saved!');
                self.transitionToRoute('quizzes-index');
            }, function(reason){
                if (self.get('content').get('isDirty'))
                    self.get('content').rollback();
                Notify.alert('cannot save!');
                self.transitionToRoute('quizzes-index');
            });
        },
        cancel: function() {
            this.get('content').rollback();
            this.transitionToRoute('quizzes-index');
        }
    }
});
