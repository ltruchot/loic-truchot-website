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
    "dojo/query",
    "scripts/brandAquarium/Canvas"
  ],
  function (on, query, BrandAquariumCanvas) {
    on(window, "resize", function () {
      var currentWidth = window.innerWidth;
      var canvasWidth;
      var canvasHeight;
      if (currentWidth <= 480) {
        /* Landscape phones and down (non-bootstrap) */
        canvasWidth = 250;
        canvasHeight = 250;
      }
      else if (currentWidth >= 481 && currentWidth <= 767) {
        /* Landscape phone to portrait tablet */
        canvasWidth = 400;
        canvasHeight = 200;
      }
      else if (currentWidth >= 768 && currentWidth <= 979) {

         //Portrait tablet to landscape and  small desktop
        canvasWidth = 650;
        canvasHeight = 150;
      }
      else if (currentWidth >= 980 && currentWidth <= 1199) {
        /* Medium desktop  */
        canvasWidth = 750;
        canvasHeight = 130;
      }
      else {
        canvasWidth = 900;
        canvasHeight = 100;
      }
      console.log(BrandAquariumCanvas);
      debugger;
      var brandAquarium = new BrandAquariumCanvas(canvasWidth, canvasHeight);
      debugger;
      brandAquarium.launchBrandAquarium();


    });

  });
};

Template.Footer.destroyed = function () {
};