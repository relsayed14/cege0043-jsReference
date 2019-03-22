var userMarker;
var firstLoad = true;
var openQuiz = null; // to mark the current quiz the user has open 
var user_position = null;

// keep device location in this variable
// var userLocation = null;

// code to check if location settings are on
function trackLocation() {
	console.log(navigator.geolocation);
	if(navigator.geolocation) {
		 getDistanceFromMultiplePoints({coords:{latitude:51.6095209,longitude:-0.200509}});
		navigator.geolocation.watchPosition(getDistanceFromMultiplePoints);
	} else {
		alert("Geolocation is not supported by this browser. Please change your settings and try again.");
	}
}


// function to get distance from several points on the layer
function getDistanceFromMultiplePoints(position) {
	user_position = position;

	var minDistance = 1000000; 
	var closestQuiz = null;

	//console.log(quizPointsJSON);
	//alert("Here1" + quizPointsJSON[0].features.length);

	for (var i = 0; i < quizPointsJSON[0].features.length; i++) { 
		var obj = quizPointsJSON[0].features[i];
		var distance = calculateDistance(position.coords.latitude,
			position.coords.longitude,obj.geometry.coordinates[1], obj.geometry.coordinates[0], 'K'); 
		if (distance < minDistance && !isAnswered[obj.properties.id]){
			minDistance = distance;
			closestQuiz = obj.properties;
		
		}
	}
	// function to check if quiz is not open, or if the open popup is not the closest quiz or closest quiz has been answered incorrectly
	if((!openQuiz || (openQuiz && openQuiz.id != closestQuiz.id))){
		openQuiz = closestQuiz;
		markers[openQuiz.id].openPopup(); // pop up closest quiz
	}
}

function getDistanceFromMultiplePointsAllUsers(position) {
	var minDistance = 1000000; 
	var closestQuiz = null;
	var closest5=[];

	var points = quizPointsJSONAllUsers[0].features;
	//console.log(quizPointsJSON);
	//alert("Here1" + quizPointsJSON[0].features.length);
	points.sort(function(a,b){
		return calculateDistance(position.coords.latitude,
			position.coords.longitude,a.geometry.coordinates[1], a.geometry.coordinates[0], 'K')-
		calculateDistance(position.coords.latitude,
			position.coords.longitude,b.geometry.coordinates[1], b.geometry.coordinates[0], 'K');
	})


	

	quizPointsJSONAllUsers[0].features = points.slice(0,5);
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

