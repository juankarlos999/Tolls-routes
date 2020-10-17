var map, geometryOutputOrigin, geometryOutputDest, inputOrigin, inputDest;
const image =
"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
if(sessionStorage.getItem('lat')){
  console.log('storage de inicio')
  sessionStorage.clear();
} else {
  console.log('Sin storage de inicio')
}
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

    // Request API Rest for Array of tolls markers or Routes and Cost
    var requestData = {"points": [
      {
        "lat": 10.3932277, 
        "lng": -75.4832311

      },
      {
        "lat": 4.710988599999999, 
        "lng": -74.072092
      }
    ],
    "vehicle": {
        "name": "Camioneta"
    }
    }
    // 4.7109851,-74.1421321
   // 8.842959 -76.438679
    var urlServTolls = 'http://quickapi-env.eba-tkndff3x.us-east-1.elasticbeanstalk.com/api/tolls';
    var urlServApi = 'http://quickapi-env.eba-tkndff3x.us-east-1.elasticbeanstalk.com/api/routes/tolls';

    var requestTolls = new Request(urlServApi, {
      method : 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body : JSON.stringify(requestData)
     });
    async function apiTolls(){
      const response = await fetch(requestTolls);
      const respTolls = await response.json();
      console.log(respTolls.tolls);
      // Loop through data(coordinates - name)
      for(i of respTolls.tolls){
        addMarker(i);
       console.log(i.coordinates);
      }
      // Add Marker Function 
      function addMarker(props){
        var marker = new google.maps.Marker({
         position: props.coordinates,
         map: map,
         icon: 'img/toll-route.svg'
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
  } else {
    console.log(locationOrign);
    }
  axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
    params:{
      address: locationOrign,
      key:'AIzaSyDUU1bnQ03PRR_wBR6uCV9hqXDMk4TlQG0'
    }
  })
  .then(function(response){
    console.log(response);

    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    geometryOutputOrigin = {lat:lat, lng:lng};
    console.log('Origin:', geometryOutputOrigin);
    sessionStorage.setItem('lat', lat);
    sessionStorage.setItem('lng', lng);
    
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
      key:'AIzaSyDUU1bnQ03PRR_wBR6uCV9hqXDMk4TlQG0'
    }
  })
  .then(function(response){
    console.log(response);

    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    geometryOutputDest = {lat:lat, lng:lng};
    console.log('Destination:', geometryOutputDest);

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
async function typeVehFuel(){
  var typeVehicle = document.getElementById('vehicle');
  var optionVehicle= typeVehicle.options[typeVehicle.selectedIndex].value;
  var typeFuel = document.getElementById('fuel');
  var optionFuel= typeFuel.options[typeFuel.selectedIndex].value;
  console.log(optionFuel, optionVehicle);
  // Return la información en sessionStorage
  console.log('Test var lat Origen:', sessionStorage.getItem('lat'));
  console.log('Test var lng Origin:', sessionStorage.getItem('lng'));
}
/*
// method POST Api Route-Tolls
var urlaux = 'http://quickapi-env.eba-tkndff3x.us-east-1.elasticbeanstalk.com/api/routes/tolls';
var requestData = {"points": [
  {
    "lat": 8.842959, 
    "lng": -76.438679
  },
  {
    "lat": 6.413056, 
    "lng": -75.705379
  }
],
"vehicle": {
    "name": "Camioneta"
}
}
  
  const usersPromise = fetch(urlaux, {
    method : 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body : JSON.stringify(requestData)
  }).then(response => {
    if (!response.ok) {
      throw new Error("Error response from API server.");
    }
    return response.json();
  }).then(responseData => {
    return responseData;
  });
  
  usersPromise.then(dataResp => {
    console.log("response apiRouteTolls: ", dataResp);
  }, error => {
    console.error("Failed to fetch route and tolls due to error: ", error);
  }); */