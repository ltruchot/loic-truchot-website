/*****************************************************************************/
/* Articles: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.Articles.events({
    /*
     * Example:
     *  'click .selector': function (e, tmpl) {
     *
     *  }
     */
});

Template.Articles.helpers({
    "articles": [
        { 
            articleName: "Les closures en JavaScript: comprendre le concept et les cas d'utilisations",
            _id: "les-closures-en-javascript-comprendre-le-concept-et-les-cas-d-utilisations",
            date: new Date("2015-03-15")
        },
        { 
            articleName: "Déployer une application Meteor sur Gandi \"Simple Hosting\"",
            _id: "deployer-une-application-meteor-sur-gandi-simple-hosting",
            date: new Date("2015-02-15")
        }
    ]
});

/*****************************************************************************/
/* Articles: Lifecycle Hooks */
/*****************************************************************************/
Template.Articles.created = function () {    
};

Template.Articles.rendered = function () {
};

Template.Articles.destroyed = function () {
};