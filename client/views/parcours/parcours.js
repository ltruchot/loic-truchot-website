/*****************************************************************************/
/* Parcours: Event Handlers and Helpers */
/*****************************************************************************/
Template.Parcours.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */


});

Template.Parcours.helpers({
  /*
   * Example:
   *  items: function () {
   *    return Items.find();
   *  }
   */
});

/*****************************************************************************/
/* Parcours: Lifecycle Hooks */
/*****************************************************************************/
Template.Parcours.created = function () {
};

Template.Parcours.rendered = function () {

    //common var
    L.Icon.Default.imagePath = 'packages/mrt_leaflet/images';
    var osmMarker = L.icon({
        iconUrl: 'images/leaflet/marker-icon-mini.png',
        iconRetinaUrl: 'images/leaflet/marker-icon-mini.png',
        iconSize: [12, 20],
        iconAnchor: [6, 20],
        popupAnchor: [0, -10],
        shadowUrl: 'images/leaflet/marker-shadow-mini.png',
        shadowRetinaUrl: 'images/leaflet/marker-shadow-mini.png',
        shadowSize: [20, 20],
        shadowAnchor: [10, 20]
    });

    //var
    var allLocationsStudies = [
        [48.840989, 2.387944], // Paris 12
        [48.852884, 2.60273], // Champs sur marne
        [48.6936, 6.1846], // Nancy
        [47.75, -3.36], // Lorient
        [47.655, -2.7603], // Vannes
        [48.114722, -1.679444] // Rennes
    ];
    var allLocationsWork = [
        [48.6936, 6.1846], // Nancy
        [36.72095, -4.41506], // Espagne
        [48.006667, 6.876667], // La bresse
        [48.6936, 6.1846], // Nancy
        [48.6936, 6.1846], // Laneuville
        [48.616667, 6.166667], // Ludres
        [48.6936, 6.1846], // Nancy
        [47.75, -3.36], // Lorient
        [47.655, -2.7603], // Vannes
        [48.114722, -1.679444], // Rennes
        [48.045556, -1.598889], // Vern sur seiche
        [32.045176, 34.769751], // Tel aviv
        [53.483333, -2.25], // Manchester
        [48.856578, 2.351828], // Paris
        [48.114722, -1.679444]  // Rennes
    ];
    var workPolyline = L.polyline(allLocationsWork);
    var workBounds = workPolyline.getBounds();
    var studiesPolyline = L.polyline(allLocationsStudies);
    var studiesBounds = studiesPolyline.getBounds();

    //init maps & layers
    L.Icon.Default.imagePath = 'packages/leaflet/images';
    var mapWork = L.map('geolocation-work-map').setView(allLocationsWork[allLocationsWork.length - 1],10);
    var mapStudies = L.map('geolocation-studies-map').setView(allLocationsStudies[allLocationsStudies.length - 1],10);

    var layer1 = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution : '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    });
    var layer2 = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution :  '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    });
    layer1.addTo(mapWork);
    layer2.addTo(mapStudies);

    //add markers
    var allMarkers = [];
    for (var i = 0; i < allLocationsWork.length; i++) {
        allMarkers.push(L.marker(allLocationsWork[i]));
        allMarkers[allMarkers.length - 1].setIcon(osmMarker);//.bindPopup("test");
        mapWork.addLayer(allMarkers[allMarkers.length - 1]);
    }

    //add polyline
    studiesPolyline.addTo(mapStudies);

    //setBounds
    mapWork.fitBounds(workBounds, {padding: [20, 20]});
    mapStudies.fitBounds(studiesBounds,  {padding: [20, 20]});


};

Template.Parcours.destroyed = function () {
};