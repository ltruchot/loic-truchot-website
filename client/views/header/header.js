/*****************************************************************************/
/* Header: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.Header.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.Header.helpers({
  /*
   * Example:
   *  items: function () {
   *    return Items.find();
   *  }
   */
});

/*****************************************************************************/
/* Header: Lifecycle Hooks */
/*****************************************************************************/
Template.Header.created = function () {
  accountsUIBootstrap3.map('fr', {
    loginButtonsLoggedOutDropdown: {
      signIn: "Sign in",
      up: "up"
    }
})

  accountsUIBootstrap3.setLanguage('fr');
};

Template.Header.rendered = function () {

};

Template.Header.destroyed = function () {
};