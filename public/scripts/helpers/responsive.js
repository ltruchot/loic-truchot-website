define([ 
], 
{
    getCurrentWindowSize: function () {
        var currentWidth = window.innerWidth;
        var size = "xl";
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
        return size;
    }

});