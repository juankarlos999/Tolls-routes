var map;
const image =
"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

function createMap () {
  var options = {
    center: { lat: 4.570868, lng: -74.297333 },
    zoom: 7
  }

  map = new google.maps.Map(document.getElementById('map'), options);

  var inputOrigin = document.getElementById('location-input-1');
  var inputDest = document.getElementById('location-input-2');
  var searchBoxOrigin = new google.maps.places.SearchBox(inputOrigin);
  var searchBoxDest = new google.maps.places.SearchBox(inputDest);

  map.addListener('bounds_changed', function() {
    searchBoxOrigin.setBounds(map.getBounds());
  });
  map.addListener('bounds_changed', function() {
    searchBoxDest.setBounds(map.getBounds());
  });

  //var markers = [];
  
  searchBoxOrigin.addListener('places_changed', function () {
    var placesOrigin = searchBoxOrigin.getPlaces();

   /* if (places.length == 0)
      return;

    markers.forEach(function (m) { m.setMap(null); });
    markers = [];

    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(p) {
      if (!p.geometry)
        return;

      markers.push(new google.maps.Marker({
        map: map,
        title: p.name,
        position: p.geometry.location
      }));

      if (p.geometry.viewport)
        bounds.union(p.geometry.viewport);
      else
        bounds.extend(p.geometry.location);
    });
    
    map.fitBounds(bounds); */
  }); 

  searchBoxDest.addListener('places_changed', function () {
    var placesDest = searchBoxDest.getPlaces();
  }); 
  // Array of markers
var markers = [
  {
    coords:{lat:6.32613,lng:-75.68854},
    iconImage:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    content:'<p>ANTIOQUIA <br> toll name: Túnel de Occidente</p>'
  },
  {
    coords:{lat:6.04676,lng:-75.65995},
    content:'<p>ANTIOQUIA <br> toll name: 857c9dea-e25e-4c87-aab2-97bce6e1b4ad</p>'
  },
  {
    coords:{lat:6.39575,lng:-75.42351},
    content:'<p>ANTIOQUIA <br> toll name: cabildo</p>'
  }
];
// Loop through markers
for(var i = 0;i < markers.length;i++){
  // Add marker
  addMarker(markers[i]);
}

// Add Marker Function
function addMarker(props){
  var marker = new google.maps.Marker({
    position:props.coords,
    map:map,
    icon: image
  });
  // Check content
  if(props.content){
    var infoWindow = new google.maps.InfoWindow({
      content:props.content
    });
    marker.addListener('click', function(){
      infoWindow.open(map, marker);
    });
  }
 }
}

/*geocodeO();
function geocodeO(){
  var loc = "Bogota";
  axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
    params:{
      address: loc,
      key:'AIzaSyB-P6jVyGDXY6xDBD6YvbTvkRdABv1Rejo'
    }
  })
  .then(function(response){

    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var geometryOutput = {lat:lat, lng:lng};
    console.log(geometryOutput);
    document.getElementById('geometry').innerHTML = `LAT: ${geometryOutput.lat} <br>LNG: ${geometryOutput.lng}`;
  })
  .catch(function(error){
    console.log(error);
  })
}*/

// Get location form
var locationForm = document.getElementById('s');
// Listen for submit
locationForm.addEventListener('submit', geocodeOrigin);
locationForm.addEventListener('submit', geocodeDest);
locationForm.addEventListener('submit', typeVehFuel);

// Call geocodeOrigin
function geocodeOrigin(e){
  // Prevent actual submit
  e.preventDefault();
  var locationOrign = document.getElementById('location-input-1').value;
  if(!locationOrign){
    alert("Ups! your ORIGIN is EMPTY. Please try again.");
  } else console.log(locationOrign);

  axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
    params:{
      address: locationOrign,
      key:'AIzaSyB-P6jVyGDXY6xDBD6YvbTvkRdABv1Rejo'
    }
  })
  .then(function(response){
    console.log(response);

    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var geometryOutputOrigin = {lat:lat, lng:lng};
    console.log(geometryOutputOrigin);

    // Test coordenates
    document.getElementById('geometryO').innerHTML = `Location Origin <br>LAT: ${geometryOutputOrigin.lat} <br>LNG: ${geometryOutputOrigin.lng}`;
  })
  .catch(function(error){
    console.log(error);
    if(ErrorEvent){
      alert("Ups! your ORIGIN is INVALID. Please try again.");
      document.getElementById('location-input-1').value = "";
    }
  })
}

// Call geocodeDest
function geocodeDest(e){
  // Prevent actual submit
  e.preventDefault();
  var locationDest = document.getElementById('location-input-2').value;
  if(!locationDest){
    alert("Ups! your DESTINATION is EMPTY. Please try again.");
  } else console.log(locationDest);

  axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
    params:{
      address: locationDest,
      key:'AIzaSyB-P6jVyGDXY6xDBD6YvbTvkRdABv1Rejo'
    }
  })
  .then(function(response){
    console.log(response);

    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var geometryOutputDest = {lat:lat, lng:lng};
    console.log(geometryOutputDest);

    // Test coordenates
    document.getElementById('geometryD').innerHTML = `Location Destination <br>LAT: ${geometryOutputDest.lat} <br>LNG: ${geometryOutputDest.lng}`;
  })
  .catch(function(error){
    console.log(error);
    if(ErrorEvent){
      alert("Ups! your DESTINATION is INVALID. Please try again.");
      document.getElementById('location-input-2').value = "";
    }
  })
}

// Catch inputs type fuel and vehicle
function typeVehFuel(){
  var typeVehicle = document.getElementById('vehicle');
  var optionVehicle= typeVehicle.options[typeVehicle.selectedIndex].value;
  var typeFuel = document.getElementById('fuel');
  var optionFuel= typeFuel.options[typeFuel.selectedIndex].value;
  console.log(optionFuel, optionVehicle);
}