/***************************************************************************
TO:DO
----------------------------------------------------------------------------
Only pull robot data based on currently selected campus location
to improve the efficiency
****************************************************************************/


var map_markers = [];
var map = null;
var ibArray = [];

function initialize() {

  var mapProp = {
    center:new google.maps.LatLng(33.658444, -111.962835),
    zoom:17,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  map=new google.maps.Map(document.getElementById("map"),mapProp);

  //Store the currently active map markers
  updateLocation();
}

//Update the location of the robots from the database on intervals
function updateLocation() {


  google.maps.event.addListener(map, "click", function(event) {
    for (var i = 0; i < ibArray.length; i++ ) {  //I assume you have your infoboxes in some array
         ibArray[i].close();
    }
});

  $.ajax({url: "/getRobotLocation", success: function(result){

    //Clear the current markers
    for (var i = 0; i < map_markers.length; i++) {
        map_markers[i].setMap(null);
    }

    //Loop through current robots in database
    result.forEach(function(entry) {

      map_markers = [];

      var marker = new google.maps.Marker({
        position: {lat: entry.lat, lng: entry.long},
        title: entry.name,
        lat_val: entry.lat,
        long_val: entry.long
      });

      map_markers.push(marker);

      var infoWindow = new google.maps.InfoWindow();
      google.maps.event.addListener(marker, "click", function (e) {
          infoWindow.setContent("Robot Name: " + entry.name + "<br>Latitude: " + entry.lat + "<br>Longitude: " + entry.long + "<br>Campus: TO-DO" );
          infoWindow.open(map, marker);
      });
      ibArray.push(infoWindow);

      marker.setMap(map);
    });
  }});
  setTimeout(updateLocation, 5000);
}

google.maps.event.addDomListener(window, 'load', initialize);
