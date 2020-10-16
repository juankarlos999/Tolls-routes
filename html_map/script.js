var map, geometryOutputOrigin, geometryOutputDest, inputOrigin, inputDest;
const image =
"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

// Create Map location Colombia
function createMap(){
  var options = {
    center: { lat: 4.570868, lng: -74.297333 },
    zoom: 7
  }
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();
  inputOrigin = document.getElementById('location-input-1');
  inputDest = document.getElementById('location-input-2');

  map = new google.maps.Map(document.getElementById('map'), options);
  directionsRenderer.setMap(map);

  searchBoxOrigin = new google.maps.places.SearchBox(inputOrigin);
  searchBoxDest = new google.maps.places.SearchBox(inputDest);

  const onChangeHandler = function () {
  calculateAndDisplayRoute(directionsService, directionsRenderer);
  };
  
  addEventListener('submit', onChangeHandler);
  addEventListener('submit', onChangeHandler);

  // Function display Route
  function calculateAndDisplayRoute(directionsService, directionsRenderer) {
  directionsService.route(
    {
      origin: {
        query: document.getElementById('location-input-1').value,
      },
      destination: {
        query: document.getElementById('location-input-2').value,
      },
      travelMode: google.maps.TravelMode.DRIVING,
    },
    (response, status) => {
      if (status === "OK") {
        directionsRenderer.setDirections(response);
      } else {
        window.alert("Directions request failed due to " + status);
      }
    }
  );
  }  

    // Request Api for Array of markers
    var urlServ = 'http://quickapi-env.eba-tkndff3x.us-east-1.elasticbeanstalk.com/api/tolls';
    var requestTolls = new Request(urlServ, {
      method: 'GET',
      mode: 'cors'
     });
    async function apiTolls(){
      const response = await fetch(requestTolls);
      const respTolls = await response.json();
      console.log(respTolls);
      // Loop through data(coordinates - name)
      for(i of respTolls.data.tolls){
        addMarker(i);
        //console.log(i.name);
      }
      // Add Marker Function 
      function addMarker(props){
        var marker = new google.maps.Marker({
         position: props.coordinates,
         map: map,
         icon: 'drawToll.jpg'
       });
       
       // Check content name vg
       if(props.name){
         var infoWindow = new google.maps.InfoWindow({
           content:props.name
         });
         marker.addListener('click', function(){
           infoWindow.open(map, marker);
         });
       } 
      }
    }
    locationForm.addEventListener('submit', apiTolls);
}

// Get location form
var locationForm = document.getElementById('floating-form');
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
      key:'KEY-APIGOOGLE'
    }
  })
  .then(function(response){
    console.log(response);

    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    geometryOutputOrigin = {lat:lat, lng:lng};
    console.log(geometryOutputOrigin);

    // Test coordenates
    //document.getElementById('geometryO').innerHTML = `Location Origin <br>LAT: ${geometryOutputOrigin.lat} <br>LNG: ${geometryOutputOrigin.lng}`;
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
      key:'KEY-APIGOOGLE'
    }
  })
  .then(function(response){
    console.log(response);

    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    geometryOutputDest = {lat:lat, lng:lng};
    console.log(geometryOutputDest);

    // Test coordenates
    //document.getElementById('geometryD').innerHTML = `Location Destination <br>LAT: ${geometryOutputDest.lat} <br>LNG: ${geometryOutputDest.lng}`;
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
