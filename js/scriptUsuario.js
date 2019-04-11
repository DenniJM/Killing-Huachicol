//Funcion para mostrar el mapa en el modal
$(document).ready(function (){
  $('#denunciar').on("click",function(event){
    console.log("ingrese a la funcion");
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
   var data = {username:'fer@gmail.com',password:'12345',grant_type:'password'};
    $.ajax({
      url: 'https://auth-service-huachicol.herokuapp.com/oauth/token',
      type:'POST',
      dataType: 'JSON',
      data: data,
      headers:{'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic '+btoa('angularjwtclientid:12345')
              }
    }).done(function(response){
      console.log("token");
      console.log(response);
    });
});
