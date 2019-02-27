
// track user location
function trackLocation() {
	if(navigator.geolocation) {
		navigator.geolocation.watchPosition(showPosition);
	} else {
		document.getElementById('showLocation').innerHTML = "Geolocation is not supported by this browser.";
			}
	}

var userMarker;
// code to feed location onto map
function showPosition(position) {
	// check if marker exists
	if (userMarker) {
		mymap.removeLayer(userMarker);
	}
	// add point on the map
	userMarker = L.marker([position.coords.latitude,position.coords.longitude]).addTo(mymap)
	.bindPopup("<b>You were here</b>");

	mymap.setView([position.coords.latitude, position.coords.longitude], 5);
	getDistance();

	}


function getDistance() {
	alert('getting distance');
	// getDistanceFromPoint is the function called once distance has been found
	navigator.geolocation.getCurrentPosition(getDistanceFromMultiplePoints);
}

function getDistanceFromPoint(position) {
	// find the coordinates of a point using this website ((https://itouchmap.com/latlong.html))		// these are the coordinates for Apple Store CG
	var lat = 51.52453064;
	var lng = -0.1324669;

	//return the distance in kilometres
	var distance = calculateDistance(position.coords.latitude, position.coords.longitude,lat,lng,'K');
	
	// alert user if distance is within 100m from above point
	if (distance <= 0.100) {
		alert("You are within 100m from UCL.");
	}
}

// code adopted from  https://www.htmlgoodies.com/beyond/javascript/calculate-the-distance-between-two-points-in-your-web-apps.html
function calculateDistance(lat1, lon1,lat2,lon2,unit) {
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
	if (unit=="N") { dist = dist * 0.8684 ;} // convert miles to nautical miles return dist;

	return dist;

}


// every time the user location is changed/ tracked, check the distance of the user from each
// Earthquake in the data and pop up an alert.
function getDistanceFromMultiplePoints(position) {

	//set a very large minimum distance
	var minDistance = 100000000000;
	var closestQuake = "";

	// loop through all earthquakes, and measure distance to each
	for (var i=0; i<earthquakes.features.length;i++) {
	// Each time distance is compared to large min distance
	//if smaller, it becomes the new min distance
		var obj = earthquakes.features[i];
		var distance = calculateDistance(position.coords.latitude,position.coords.longitude,obj.geometry.coordinates[0], obj.geometry.coordinates[1], 'K');
		if (distance < minDistance) {
			minDistance = distance;
			closestQuake = obj.properties.place;
		}
	}
	alert("Earthquake: " + closestQuake + "is distance " + minDistance + " away");
}
