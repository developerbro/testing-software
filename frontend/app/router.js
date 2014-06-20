import Ember from 'ember';

var Router = Ember.Router.extend({
  location: FrontendENV.locationType
});

Router.map(function() {
	this.route('login');
	this.route('register');
	this.resource('users', function() {
		this.resource('user', {path: ':user_id'});
		this.resource('users-new', {path: '/new'});
	});
	this.route('profile');
	this.resource('quizzes', function() {
		this.resource('quizzes-index', {path: '/'});
		this.resource('quiz', {path: ':quiz_id'});
		this.resource('quizzes-new', {path: '/new'});
	});
});

export default Router;
