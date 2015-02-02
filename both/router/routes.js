/*****************************************************************************/
/* Client and Server Routes */
/*****************************************************************************/
Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'
});


Router.route('/', function () {
  this.render('HomeIndex')
});


Router.route('/home', function () {
  this.render('HomeIndex')
});