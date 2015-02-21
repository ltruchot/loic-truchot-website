/*****************************************************************************/
/* Footer: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.Footer.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.Footer.helpers({
  /*
   * Example:
   *  items: function () {
   *    return Items.find();
   *  }
   */
});

/*****************************************************************************/
/* Footer: Lifecycle Hooks */
/*****************************************************************************/
Template.Footer.created = function () {
};

Template.Footer.rendered = function () {
  require([
    "dojo/on",
    "dojo/query"
  ],
  function (on, query) {
    on(window, "resize", function () {
      var currentWidth = window.innerWidth;
      var canvasWidth = 900;
      var canvasHeight = 100;
      if ((typeof(window.canvasCreationInProgress) === 'undefined') ||  !window.canvasCreationInProgress) {
        debugger;
        launchBrandAquarium(canvasWidth, canvasHeight);
      }

    });

  });
};

Template.Footer.destroyed = function () {
};