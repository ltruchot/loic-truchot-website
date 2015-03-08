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
    var thatTemplate = this;   
    require([
        "dojo/on",
        "dojo/query",
        "scripts/brandAquarium/Canvas.js",
        "scripts/helpers/responsive.js"
    ],
    function (on, query, BrandAquariumCanvas, helperResponsive) {
        

        thatTemplate.currentBrandAquarium = new BrandAquariumCanvas(helperResponsive.getCurrentWindowSize());
        

        on(window, "resize", function () {
            thatTemplate.currentBrandAquarium.destroy();
            thatTemplate.currentBrandAquarium = new BrandAquariumCanvas(helperResponsive.getCurrentWindowSize());   
        });

    });
};

Template.Footer.destroyed = function () {
    var thatTemplate = this;
    thatTemplate.currentBrandAquarium.destroy();
};