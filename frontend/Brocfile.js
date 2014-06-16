/* global require, module */
var pickFiles  = require('broccoli-static-compiler');
var mergeTrees = require('broccoli-merge-trees');
var uglifyJS   = require('broccoli-uglify-js');

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp({
  name: require('./package.json').name,

  // for some large projects, you may want to uncomment this (for now)
  es3Safe: true,

  minifyCSS: {
    enabled: true,
    options: {}
  },

  getEnvJSON: require('./config/environment')
});

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

app.import({
  development: 'vendor/ember-data/ember-data.js',
  production:  'vendor/ember-data/ember-data.prod.js'
}, {
  'ember-data': [
    'default'
  ]
});

// Ember Simple Auth
app.import('vendor/ember-simple-auth/ember-simple-auth.js');

// Notify
app.import('vendor/alertify.js/themes/alertify.bootstrap.css');
app.import('vendor/alertify.js/themes/alertify.core.css');
app.import('vendor/alertify.js/themes/alertify.default.css');
app.import('vendor/ember-notify/dist/named-amd/main.js', {
    'ember-notify': ['default']
});
app.import('vendor/ember-notify/dist/ember-notify.css');

// bootstrap
app.import('vendor/bootstrap/dist/js/bootstrap.js');
app.import('vendor/bootstrap/dist/css/bootstrap.css');
app.import('vendor/bootstrap/dist/css/bootstrap-theme.css');
var bootstrapTree = pickFiles('vendor/bootstrap/dist/fonts', {
    srcDir  : '/',
    files   : ['**/*'],
    destDir : '/fonts'
});

// js-md5
app.import('vendor/js-md5/js/md5.js');

// ember-i18n
app.import('vendor/cldr/plurals.js');
app.import('vendor/ember-i18n/lib/i18n.js');

app.import('vendor/ic-ajax/dist/named-amd/main.js', {
  'ic-ajax': [
    'default',
    'defineFixture',
    'lookupFixture',
    'raw',
    'request',
  ]
});


module.exports = mergeTrees([app.toTree(), bootstrapTree]);
