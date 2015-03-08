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
    });
};


Template.Header.rendered = function () {
    
    require([
        "dojo/dom-class",
        "dojo/dom-style",
        "dojo/mouse",
        "dojo/on",
        "dojo/query"     
    ], function (domClass, domStyle, mouse, on, query) {
        var mainMenuItems = query(".main-menu-item");
        mainMenuItems.on("mouseover", function(event) {
            var menuItemInfo = query(".menu-item-info", event.target)[0] || null;
            if (menuItemInfo) {
                domStyle.set(menuItemInfo, "display", "block");
                domClass.add(event.target, "active-menu-item");
            }
        });
        mainMenuItems.on("mouseout", function () {
            var menuItemInfo = query(".menu-item-info", event.target)[0] || null;
            if (menuItemInfo && !domClass.contains(event.target, "clicked-menu-item")) {
                domStyle.set(menuItemInfo, "display", "none");
                domClass.remove(event.target, "active-menu-item");
            }         
        });
        mainMenuItems.on("click", function() {
            var menuItemInfo = query(".menu-item-info", event.target)[0] || null;
            query(".clicked-menu-item").forEach(function (clickedMenuItem) {
                domClass.remove(clickedMenuItem, "clicked-menu-item");                     
            });
            query(".active-menu-item").forEach(function (activeMenuItem) {
                domClass.remove(activeMenuItem, "active-menu-item");                
            });
                 
            query(".menu-item-info").forEach(function (otherMenuItemInfo) {
                domStyle.set(otherMenuItemInfo, "display", "none");
            });
            domClass.add(event.target, "clicked-menu-item");
            domClass.add(event.target, "active-menu-item");
            domStyle.set(menuItemInfo, "display", "block");                      
           
        });
    });
   
    // $("#site-title").on("click", function() {
    //     $(".clicked-menu-item").removeClass("clicked-menu-item");
    //     $(".active-menu-item").removeClass("active-menu-item");
    //     $(".menu-item-info").hide();
    // });
};

Template.Header.destroyed = function () {
};