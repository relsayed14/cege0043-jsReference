var userMarker;
var firstLoad = true;
var userLocation = null;


function getLocation() {

	if(navigator.geolocation) {
		alert('getting location');
		navigator.geolocation.getCurrentPosition(getPosition);
	} else {
		alert("Geolocation is not supported by this browser. Please change your settings and try again.");
	}
}

function getPosition(position) {
			// use the position variable to get the actual coordinates
			userLocation = position.coords;
			console.log(userLocation);

			if (userMarker) {
				mymap.removeLayer(userMarker);
			}

	// Zoom into user location
    // firstLoad variable is a flag to change the map centre 
    if(firstLoad){
    	firstLoad = false;
    	mymap.panTo(new L.LatLng(userLocation.latitude, userLocation.longitude));
    }
    console.log("Moved to", position);

    // get user coordinates, add to the map, then display them as popup on the map
    userMarker = L.marker([position.coords.latitude, position.coords.longitude])
    .addTo(mymap)
    .bindPopup("Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude);

} 