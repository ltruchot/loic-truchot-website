/*****************************************************************************/
/* Client App Namespace  */
/*****************************************************************************/
_.extend(App, {
});

App.helpers = {
};

_.each(App.helpers, function (helper, key) {
  Handlebars.registerHelper(key, helper);
});

Meteor.startup(function () {

  require([
    "dojo/on",
    "dojo/domReady!"
  ],
  function (on) {
    //on(window, "resize", function () {
      // if (currentWidth <= 480) {
      //   /* Landscape phones and down (non-bootstrap) */
      //   newSize = "480";
      //   $(".entete-gauche h1 a").text("{NaN}");
      //   canvasWidth = 250;
      //   canvasHeight = 250;
      // }
      // else if (currentWidth >= 481 && currentWidth <= 767) {
      //   /* Landscape phone to portrait tablet */
      //   newSize = "767";
      //   $(".entete-gauche h1 a").text("{NaN}");
      //   canvasWidth = 400;
      //   canvasHeight = 200;
      // }
      // else if (currentWidth >= 768 && currentWidth <= 979) {

      //    //Portrait tablet to landscape and  small desktop
      //   newSize = "979";
      //   $(".entete-gauche h1 a").text("{NaN}");
      //   canvasWidth = 650;
      //   canvasHeight = 150;
      // }
      // else if (currentWidth >= 980 && currentWidth <= 1199) {
      //   /* Medium desktop  */
      //   newSize = "1199";
      //   $(".entete-gauche h1 a").text("{Noesis and Neighbors}");
      //   canvasWidth = 750;
      //   canvasHeight = 130;
      // }
      // else if (currentWidth >= 1200) {
      //   /*  Large desktop */
      //   newSize = "1200";
      //   $(".entete-gauche h1 a").text("{Noesis and Neighbors}");
      // }
    //});
  });

});
