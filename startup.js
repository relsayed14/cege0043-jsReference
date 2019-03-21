// code to process the html files 
function loadW3HTML(){
	w3.includeHTML();
}

//wait for document to load, then start tracking user
function startup() {
	document.addEventListener('DOMContentLoaded', function() {
		trackAndCircle();
	}, false);
}

function questionStartup() {
	alert("Welcome to the Questions App!");
	document.addEventListener('DOMContentLoaded', function() {
		getPort(); // obtain port number 
		loadW3HTML(); // add HTML functionality
	},false);
}

function quizStartup() {
	getPort(); // obtain port number 
	loadW3HTML(); // add HTML functionality
	setTimeout(function(){ 
			getAllAnswers(); 
	}, 1000); // to make sure that the port number is obtained before loading the answers
	setTimeout(function(){ 
			loadQuizPoints(true);
			trackLocation(); // track the user's location
	 }, 2000); // to make sure that the port number is obtained before loading the quiz points

}