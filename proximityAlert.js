// proximity alert to pop question when user is within (max) 100m from the closest quiz pointf
function popQuizPoint(position) {
	alert("gathering info on nearby quiz points... ");

	var maxDistance = 0.1;

	var userLatitude = position.coords.latitude;
	var userLongitude = position.coords.longitude;

	// call calculate distance function and provide the parameters

	// compare distance to maxDistance
	// if less, pop up the closest quiz
}

