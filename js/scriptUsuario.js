// Initialize and add the map
function initMap() {
  // The location of Uluru
  var uluru = {lat: -25.344, lng: 131.036};
  // The map, centered at Uluru
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 4, center: uluru});
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({position: uluru, map: map});
}
//Funcion para mostrar el mapa en el modal
$(document).ready(function (){
  $('#denunciar').on("click",function(event){
    console.log("ingrese a la funcion");
  /*  var locationCircle = new ol.Feature(); -- version 3

    var map = new ol.Map({
    view: new ol.View({
    zoom: 17,
    center: [10030840, 6731350]
    }),
    target: 'miMapa',
    layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    }),
    new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [locationCircle]
      })
    })
    ]
    });

    new ol.Geolocation({
      projection: map.getView().getProjection(),
      tracking: true,
      trackingOptions: {
        enableHighAccuracy: true
      }
    })
    .on('change', function() {
      var position = this.getPosition();
      map.getView().setCenter(position);
      locationCircle.setGeometry(
        new ol.geom.Circle(position, 20)
      );
    });

  });*/

  var mapa = new OpenLayers.Map("miMapa");
  var osm = new OpenLayers.Layer.OSM();// funcion para street view
  mapa.addLayer(osm);
  mapa.addControl(new OpenLayers.Control.LayerSwitcher(true));
  mapa.addControl(new OpenLayers.Control.MousePosition({ numDigits: 2 }));
  mapa.addControl(new OpenLayers.Control.ScaleLine());
  mapa.setCenter(new OpenLayers.LonLat(0, 40).transform(
      new OpenLayers.Projection("EPSG:4326"), mapa.getProjectionObject()
  ), 5);
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      var coordenadas = new OpenLayers.LonLat(lng, lat).transform(
        new OpenLayers.Projection("EPSG:4326"), mapa.getProjectionObject())
      mapa.setCenter(coordenadas,14);
      var markers = new OpenLayers.Layer.Markers("Marcas");
      markers.addMarker(new OpenLayers.Marker(coordenadas));
      mapa.addLayer(markers);
      $("#lat").val(lat);
      $("#lng").val(lng);
    });
  }
 });
});
