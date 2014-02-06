      var map;
      var pos;
      var lat;
      var lng;
      var address;
      var infowindow = new google.maps.InfoWindow({});
       var marker = new google.maps.Marker({});
function initialize() {
  
  var mapOptions = {
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    enableHighAccuracy: true
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  // Try HTML5 geolocation
  if(navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

     

      map.setCenter(pos);
      // infowindow.setMap(map);
      // infowindow.setPosition(pos);
      // infowindow.setContent("<b><i class='fa fa-map-marker fa-lg'></i> You are here.</b>"); 
      marker.setMap(map);
      marker.setPosition(pos);
      
      lat = position.coords.latitude;
      lng = position.coords.longitude; 
      // lat = 14.567676;
      // lng = 121.04431;
      var url = "http://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&sensor=true"; 
      
       
       $.ajax({
          type : "get",
          url: url,
          async : false,
          success:function(data){

            localStorage.location = "false";
            address = data.results[0].formatted_address;
            $("#location").html(data.results[0].formatted_address);
             
        
        }
      });
      
       setMapInfo(lat, lng, address);

       $.ajax({
        url : "http://rescuemakati.cloudapp.net/track/add",
        type : "POST",
        data : {
          id : getUnitInfo().id,
          type : getUnitInfo().type,
          platenum : getUnitInfo().platenum,
          lat : getMapInfo().lat,
          lng : getMapInfo().lng,
          address : getMapInfo().address
        },
        success : function(data){
          return;
        },
        error : function(err){
          console.log(err);
        }
       });
     
    }, function() {
      handleNoGeolocation(true);
    }, {enableHighAccuracy: true});

    

  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }



}




function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(60, 105),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}

