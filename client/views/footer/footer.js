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
  var canvasConf = {
    "xs" :{
      canvasWidth: 250,
      canvasHeight: 250
    },
    "sm": {
      canvasWidth: 400,
      canvasHeight: 200
    },
    "md": {
      canvasWidth: 650,
      canvasHeight: 150

    },
    "lg": {
      canvasWidth: 750,
      canvasHeight: 130
    },
    "xl": {
      canvasWidth: 900,
      canvasHeight: 100
    }
  };
  var getCurrentWindowSize = function () {
    var currentWidth = window.innerWidth;
    var size;
    if (currentWidth <= 480) {
      /* Landscape phones and down (non-bootstrap) */
      size = "xs";

    }
    else if (currentWidth >= 481 && currentWidth <= 767) {
      /* Landscape phone to portrait tablet */
      size = "sm";
    }
    else if (currentWidth >= 768 && currentWidth <= 979) {

       //Portrait tablet to landscape and  small desktop
      size = "md";
    }
    else if (currentWidth >= 980 && currentWidth <= 1199) {
      /* Medium desktop  */
      size = "lg";
    }
    else {
      size = "xl";
    }
    return size;
  };
  require([
    "dojo/on",
    "dojo/query",
    "scripts/brandAquarium/Canvas.js"
  ],
  function (on, query, BrandAquariumCanvas) {

    var currentWindowsSize = getCurrentWindowSize();
    var canvasWidth = canvasConf[currentWindowsSize].canvasWidth;
    var canvasHeight = canvasConf[currentWindowsSize].canvasHeight;
    var brandAquarium = new BrandAquariumCanvas(canvasWidth, canvasHeight);
    brandAquarium.launchBrandAquarium();

    on(window, "resize", function () {


    });

  });
};

Template.Footer.destroyed = function () {
};