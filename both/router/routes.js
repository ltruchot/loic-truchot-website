/*****************************************************************************/
/* Client and Server Routes */
/*****************************************************************************/
Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'
});


Router.route('/', function () {
  this.render('HomeIndex');
});


Router.route('/home', function () {
  this.render('HomeIndex');
});

Router.route('/parcours', function () {
  this.render('Parcours');
});
Router.route('/articles', function () {
  this.render('Articles');
});
Router.route('/articles/:_id', {
	name: 'articleContent'
});
Router.route('/realisations', function () {
  this.render('Realisations');
});
