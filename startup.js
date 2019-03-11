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

function quizStartup(){
	alert('Starting quiz app...');
	document.addEventListener('DOMContentLoaded',function(){
		getPort(); // to automatically add the correct port numbers without being hard-coded
		loadW3HTML(); 
		trackLocation(); // to automatically track the user's location
	},false);
}

function questionStartup(){
	alert('Starting question app...');
	document.addEventListener('DOMContentLoaded',function(){
		getPort(); // to automatically add the correct port numbers without being hard-coded
		loadW3HTML();
		trackLocation(); // to automatically track user's location
	},false);
}
