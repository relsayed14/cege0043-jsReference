var userMarker;

// code to check if location settings are on
function trackLocation() {
	if(navigator.geolocation) {
		navigator.geolocation.watchPosition(showPosition);
	} else {
		document.getElementById('showLocation').innerHTML = "Geolocation is not supported by this browser. Please change your settings and try again."
	}
}

// code to display user location on map by drawing a point
function showPosition(position) {
	if (userMarker) {
		mymap.removeLayer(userMarker);
	}

	// get user coordinates, add to the map, then display them as popup on the map
	userMarker = L.marker([position.coords.latitude, position.coords.longitude])
	.addTo(mymap)
	.bindPopup("Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude);
	getDistance();
	
}

// calculate distance between user and multiplepoints
function getDistance() {
	// alert('getting distance...');
	//getDistanceFromPoint is the function called once distance has been found
	navigator.geolocation.getCurrentPosition(getDistanceFromMultiplePoints);
}

// calculate distance between user and only the selected point
function getSetDistance() {
	//getDistanceFromPoint is the function called once distance has been found
	navigator.geolocation.getCurrentPosition(getDistanceFromPoint);
}
// get distance only from the pre-definied point
function getDistanceFromPoint(position) {
	//find the coordinates of a point using this website: https://getlatlong.net
	// these are the coordinates for UCL Main Gate
	var lat = 51.524616;
	var lng = -0.13818;

	//returnt the distance in kilometres
	var distance = calculateDistance(position.coords.latitude, position.coords.longitude,lat,lng,"K");
	alert("You are within " + distance + " m from point.")
	document.getElementById("distancediv").innerHTML = "The distance between the user and the fixed point is " + distance + " km."
	
}


// function to get distance from several points on the layer
function getDistanceFromMultiplePoints(position) {
	var minDistance = 0.1; var closestQuiz = "";
	for(var i = 0; i < quizzes.features.length; i++) { var obj = quizzes.features[i];
		var distance = calculateDistance(position.coords.latitude,
			position.coords.longitude,obj.geometry.coordinates[0], obj.geometry.coordinates[1], 'K'); 
		if (distance < minDistance){
			minDistance = distance;
			closestQuiz = obj.properties.place;
		}
	}
	alert("Closest quiz: " + closestQuake + " is " + minDistance + " away");

	// pop up closest quiz
}

//code to get distance adapted from https://www.htmlgoodies.com/beyond/javascript/calculate-the-distance-between-two-points-inyour-web-apps.html
function calculateDistance(lat1, lon1, lat2, lon2, unit){
	var radlat1 = Math.PI * lat1/180;
	var radlat2 = Math.PI * lat2/180;
	var radlon1 = Math.PI * lon1/180;
	var radlon2 = Math.PI * lon2/180;
	var theta = lon1-lon2;
	var radtheta = Math.PI * theta/180;
	var subAngle = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	subAngle = Math.acos(subAngle);
	subAngle = subAngle * 180/Math.PI; // convert the degree value returned by acos back to degrees from radians
	dist = (subAngle/360) * 2 * Math.PI * 3956; // ((subtended angle in degrees)/360) * 2 * pi * radius )
															// where radius of the earth is 3956 miles
	if (unit=="K") { dist = dist * 1.609344 ;} // convert miles to km
	if (unit=="N") { dist = dist * 0.8684 ;} // convert miles to nautical miles
	return dist;
}

