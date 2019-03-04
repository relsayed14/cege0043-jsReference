//loading HTML into a file
function loadW3HTML() {
	w3.includeHTML();
}
//tracking the locaiton of a user and adding a circle
function trackAndCircle() {

	trackLocation();
	addPointLinePoly();
	getEarthquakes();
	loadW3HTML();

}

function startup() {
	document.addEventListener('DOMContentLoaded', function(){
		getPort();
		trackAndCircle();
	}, false);
}